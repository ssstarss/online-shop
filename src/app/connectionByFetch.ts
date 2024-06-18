import {
  CustomerDraft,
  Category,
  Cart,
  DiscountCode,
  DiscountCodePagedQueryResponse,
} from '@commercetools/platform-sdk';
import { IProduct, Idiscount, GetProductsParams, IProducts } from '../interfaces/product';
import { Mutable, Customer, CustomerAccauntDetails, CartActions } from '../interfaces/customer';

export class ConnectionByFetch {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES;

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  bearerToken = '';

  tokenExpirationDate = new Date().getTime();

  currentCustomer: Customer = Object();

  discounts: Idiscount[] = [];

  myCart: Mutable<Cart> = {} as Cart;

  clientType: 'anonymous' | 'customer' = 'anonymous';

  async init() {
    const id = localStorage.getItem('id');
    // let tokenExpirationDate = 0;

    // const temp = localStorage.getItem('tokenExpirationDate');
    // if (temp) tokenExpirationDate = parseInt(temp, 10);
    // else tokenExpirationDate = 0;
    if (!id) await this.loginAnonymous();

    if (id === 'anonymous') {
      this.bearerToken = localStorage.getItem('token') || '';
      this.clientType = 'anonymous';
    } else {
      this.bearerToken = localStorage.getItem('token') || '';
      if (id) this.currentCustomer.id = id;
      this.clientType = 'customer';
      if (id) this.currentCustomer = await this.getCustumerByID(id);
    }
    try {
      this.discounts = await this.getDiscountedProducts();
    } catch (e) {
      await this.loginAnonymous();
      this.discounts = await this.getDiscountedProducts();
    }
  }

  async obtainTokenByPassword(username: string, password: string) {
    const header = new Headers();
    header.append(
      'Authorization',
      `Basic ${btoa(this.ADMIN_CLIENT_ID.concat(':', this.ADMIN_CLIENT_SECRET))}`
    );
    const requestParams = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    });

    const options = {
      method: 'POST',
      headers: header,
      body: requestParams,
    };
    const url = this.AUTH_URL.concat(`/oauth/${this.projectKey}/customers/token`);
    await fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        this.bearerToken = JSON.parse(result).access_token;
        const now = new Date();
        this.tokenExpirationDate = now.getTime() + 172800;
        localStorage.setItem('tokenExpirationDate', this.tokenExpirationDate.toString());
        localStorage.setItem('token', this.bearerToken);
      });
    // добавить обработку ошибок
    return this.bearerToken;
  }

  async loginByPassword(email: string, password: string): Promise<Response> {
    const currenCart = await this.getCart();

    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', `Bearer ${this.bearerToken}`);

      const requestParams = {
        email,
        password,
        anonymousCart: {},
        anonymousCartSignInMode: 'UseAsNewActiveCustomerCart',
      };
      if (currenCart.id)
        requestParams.anonymousCart = {
          id: currenCart.id,
          typeID: 'cart',
        };

      const options = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(requestParams),
      };
      const url = this.API_URL.concat(`/${this.projectKey}/login`);
      fetch(url, options).then((response) => {
        if (response.ok) {
          this.obtainTokenByPassword(email, password);
          resolve(response);
        } else {
          response.json().then((result) => {
            reject(result.message);
          });
        }
      });
    });
  }

  async loginAnonymous() {
    const header = new Headers();
    header.append(
      'Authorization',
      `Basic ${btoa(this.ADMIN_CLIENT_ID.concat(':', this.ADMIN_CLIENT_SECRET))}`
    );
    const requestParams = new URLSearchParams();
    requestParams.append('grant_type', 'client_credentials');
    requestParams.append('scope', this.SCOPES);

    const options = {
      method: 'POST',
      headers: header,
      body: requestParams,
    };
    const url = this.AUTH_URL.concat(`/oauth/${this.projectKey}/anonymous/token?`);
    return fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        this.bearerToken = result.access_token;
        this.clientType = 'anonymous';
        localStorage.setItem('token', this.bearerToken);
        localStorage.setItem('id', 'anonymous');
        this.myCart = Object();
        return result.access_token;
      });

    // добавить обработку ошибок
  }

  async getProducts(params?: GetProductsParams) {
    this.myCart = await this.getCart();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const requestParams = new URLSearchParams();

    if (params) {
      if (params.category) requestParams.append('filter', `categories.id:"${params.category}"`);
      if (params.searchText) {
        requestParams.append('text.en-US', params.searchText);
        requestParams.append('fuzzy', 'true');
      }
      if (params.sort)
        if (params.sort.param === 'name')
          requestParams.append('sort', `name.en-US ${params.sort.direction.toLowerCase()}`);
        else requestParams.append('sort', `price ${params.sort.direction.toLowerCase()}`);
      if (params.filterPrice)
        requestParams.append(
          'filter.query',
          `variants.price.centAmount:range(${params.filterPrice.higherThen} to ${params.filterPrice.lowerThen})`
        );
      if (params.pagination) {
        requestParams.append('limit', `${params.pagination.limit}`);
        requestParams.append('offset', `${params.pagination.offset}`);
      }
    }
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat(
      '/',
      this.projectKey,
      '/product-projections/search?',
      `${requestParams}`
    );

    return fetch(url, requestOptions).then((response) =>
      response.json().then((result: IProducts) => {
        const products: IProducts = Object();
        products.results = [];
        products.count = result.count;
        products.limit = result.limit;
        products.offset = result.offset;
        products.total = result.total;

        result.results.forEach((product: IProduct, index: number) => {
          products.results[index] = JSON.parse(JSON.stringify(product)) as IProduct;
          if (product.masterVariant.prices[0].discounted) {
            const discount = this.discounts.find(
              (item) => item.id === product.masterVariant.prices[0].discounted.discount.id
            );
            products.results[index].masterVariant.prices[0].discounted.discount = JSON.parse(
              JSON.stringify(discount)
            );
          }
          products.results[index].inCart = false;
          if (this.myCart.id) {
            if (this.myCart.lineItems.findIndex((line) => line.productId === product.id) >= 0) {
              products.results[index].inCart = true;
            }
          }
        });
        return JSON.parse(JSON.stringify(products));
      })
    );
  }

  async getProductByID(id: string) {
    this.myCart = await this.getCart();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, '/product-projections/', `${id}`);

    return fetch(url, requestOptions).then((response) =>
      response.json().then((product) => {
        const discountedProduct = JSON.parse(JSON.stringify(product));

        if (product.masterVariant.prices[0].discounted) {
          const discount = this.discounts.find(
            (item) => item.id === product.masterVariant.prices[0].discounted.discount.id
          );
          discountedProduct.masterVariant.prices[0].discounted.discount = JSON.parse(
            JSON.stringify(discount)
          );
        }
        discountedProduct.inCart = false;
        if (this.myCart.lineItems.findIndex((line) => line.productId === product.id) >= 0)
          discountedProduct.inCart = true;
        return discountedProduct;
      })
    );
  }

  ///
  async getCategoryByID(categoryId: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, '/categories/', `${categoryId}`);

    return fetch(url, requestOptions).then((response) =>
      response.json().then((category) => {
        return category;
      })
    );
  }

  ///

  async getDiscountedProducts() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, `/product-discounts/`);
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(response.status.toString());
    const result = await response.json();
    return result.results;
  }

  async signUpCustomer(customer: Mutable<CustomerDraft>): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const raw = JSON.stringify(customer);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    const url = this.API_URL.concat(`/${this.projectKey}/customers`);
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          this.loginByPassword(customer.email, customer.password || '');
          resolve(response);
        } else {
          response.json().then((result) => {
            reject(result.message);
          });
        }
      });
    });
  }

  // добавить обработку ошибок}

  async getCustumerByID(id: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, `/customers/${id}`);
    return fetch(url, requestOptions).then((response) => {
      return response.json();
    });
    // добавить обработку ошибок
  }

  async deleteCustomer(id: string) {
    const customer = await this.getCustumerByID(id);

    const customerVersion = customer.version;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
    };
    const url = this.API_URL.concat(
      '/',
      this.projectKey,
      `/customers/${id}?version=${customerVersion}`
    );
    fetch(url, requestOptions);
  }

  async updateCustomer(customer: CustomerAccauntDetails): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const raw = JSON.stringify({
      id: customer.id,
      version: customer.version,
      actions: [
        {
          action: 'setFirstName',
          firstName: customer.firstName,
        },
        {
          action: 'setLastName',
          lastName: customer.lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: customer.dateOfBirth,
        },
        {
          action: 'changeEmail',
          email: customer.email,
        },
        {
          action: 'changeEmail',
          email: customer.email,
        },
      ],
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    const url = this.API_URL.concat(`/${this.projectKey}/customers/${customer.id}`);
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then((result) => {
            this.currentCustomer.version = result.version;
          });
          resolve(response);
        } else {
          response.json().then((result) => {
            reject(result.message);
          });
        }
      });
    });
  }

  async getCategories(id?: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let url = this.API_URL.concat(`/${this.projectKey}/categories?where=parent+is+not+defined`);
    if (id)
      url = this.API_URL.concat(
        `/${this.projectKey}/categories?where=parent%28id+%3D+%22${id}%22%29`
      );
    return fetch(url, requestOptions).then((response) =>
      response.json().then((categories) => {
        const mainCategories: Category[] = [];
        categories.results.forEach((category: Category, index: number) => {
          mainCategories[index] = JSON.parse(JSON.stringify(category));
        });
        return mainCategories;
      })
    );
  }

  createCart() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const raw = JSON.stringify({
      currency: 'USD',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    const url = this.API_URL.concat(`/${this.projectKey}/me/carts`);
    return fetch(url, requestOptions).then((response) =>
      response.json().then((cart: Cart) => {
        this.myCart = JSON.parse(JSON.stringify(cart));
        if (this.myCart) localStorage.setItem('cartID', this.myCart.id);
        return JSON.parse(JSON.stringify(cart));
      })
    );
  }

  async updateCart(productId: string, action: 'plus' | 'minus' | 'remove') {
    try {
      // Fetch the cart or create a new one if it doesn't exist
      this.myCart = await this.getCart();
      if (!this.myCart.id) this.myCart = await this.createCart();

      if (this.myCart.id) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

        // Find the line item in the cart
        const lineItem = this.myCart.lineItems.find((line) => line.productId === productId);

        // Prepare the request object
        const request: CartActions = {
          version: this.myCart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItem?.id,
            },
          ],
        };

        if (action === 'minus') {
          if (lineItem?.id) request.actions[0].lineItemId = lineItem.id;
          request.actions[0].quantity = 1;
        }

        if (action === 'plus') {
          request.actions[0].action = 'addLineItem';
          request.actions[0].quantity = 1;
          request.actions[0].productId = productId;
        }

        const raw = JSON.stringify(request);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };

        // Make the API request to update the cart
        const url = this.API_URL.concat(`/${this.projectKey}/me/carts/${this.myCart.id}`);

        try {
          const response = await fetch(url, requestOptions);

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const cartR = await response.json();
          const cart = JSON.parse(JSON.stringify(cartR));
          this.myCart = cart;
          return cart;
        } catch (fetchError) {
          console.error('Error fetching or updating the cart:', fetchError);
          throw fetchError; // Re-throw the error to be handled by the outer try-catch
        }
      }

      throw new Error('Something went wrong in updateCart: Cart ID is missing');
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Error in updateCart:', error.message);
        throw new Error(`Something went wrong in updateCart:  ${error.message}`);
      }
      throw new Error(`Unknown error in updating cart:  ${error}`);
      // return Error;
    }
  }

  async getCart() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const url = this.API_URL.concat(`/${this.projectKey}/me/carts`);

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const carts = await response.json();

      if (carts.results && carts.results.length > 0) {
        return carts.results[carts.results.length - 1];
      }

      return 'Cart is absent';
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Error in getCart:', error.message);
        throw new Error(`Error in getting cart: ${error.message}`);
      }
      // console.error('Unknown error in getCart:', error);
      throw new Error(`Unknown error in getting cart: ${error}`);
    }
  }

  async deleteCart() {
    try {
      let cart = await this.getCart();

      if (!cart.id) {
        throw new Error('No cart found to delete');
      }

      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
      };

      const url = this.API_URL.concat(
        `/${this.projectKey}/me/carts/${cart.id}?version=${cart.version}`
      );

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      cart = await this.getCart();

      if (cart.id) {
        await this.deleteCart();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error in deleting cart: ${error.message}`);
      } else {
        throw new Error(`Failed to delete the cart: ${error}`);
      }
    }
  }

  async applyDiscountCode(promoCode: string) {
    this.myCart = await this.getCart();
    if (this.myCart) {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
      const discountCodes = await this.getDiscountCodes();
      const discountCodeID = discountCodes.results.find(
        (discount: DiscountCode) => discount.code === promoCode
      );
      if (discountCodeID) {
        const request: CartActions = {
          version: this.myCart.version,
          actions: [
            {
              action: 'addDiscountCode',
              code: discountCodeID.code,
            },
          ],
        };

        const raw = JSON.stringify(request);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        };
        const url = this.API_URL.concat(`/${this.projectKey}/me/carts/${this.myCart.id}`);
        return fetch(url, requestOptions).then((response) =>
          response.json().then((cart: Cart) => {
            return JSON.parse(JSON.stringify(cart));
          })
        );
      }
    }
    return 'Bad code';
  }

  async getDiscountCodes() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat(`/${this.projectKey}/discount-codes`);
    return fetch(url, requestOptions).then((response) =>
      response.json().then((discountCodes: DiscountCodePagedQueryResponse) => {
        return JSON.parse(JSON.stringify(discountCodes));
      })
    );
  }
}
export const connectionByFetch = new ConnectionByFetch();

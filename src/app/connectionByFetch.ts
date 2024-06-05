import { CustomerDraft } from '@commercetools/platform-sdk';
import { IProduct, Idiscount, GetProductsParams } from '../interfaces/product';
import { Mutable, Customer, CustomerAccauntDetails } from '../interfaces/customer';

export class ConnectionByFetch {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES;

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  bearerToken = '';

  currentCustomer: Customer = Object();

  discounts: Idiscount[] = [];

  async init() {
    const id = localStorage.getItem('id');
    if (!id) await this.obtainTokenByCredentials();
    else {
      this.bearerToken = localStorage.getItem('token') || '';
      this.currentCustomer.id = id;
    }
    if (id) this.currentCustomer = await this.getCustumerByID(id);
    this.discounts = await this.getDiscountedProducts();

    /* const categories = await this.getCategories();
    console.log('Categories:', categories);

    const mainCategories = await this.getMainCategories();
    console.log('MainCategories:', mainCategories);
    const Childcategories = await this.getCategories('21060657-c616-4785-878f-15cef82d822b');
    console.log('ChildCategories:', Childcategories);

    const products = await this.getProducts({
      sort: { param: 'price', direction: 'asc' },
      category: '21060657-c616-4785-878f-15cef82d822b',
    });
    console.log('Products:', products); */

    /* const oneProduct = await this.getProductByID('0c8d600a-e4f5-4d55-8639-eefd0c0b09cd');
    console.log(oneProduct);

    /*  if (id) this.currentCustomer = await this.getCustumerByID(id);
    this.deleteCustomer('00ef4f06-8a8c-483e-9d40-259ac4496c2a'); */
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
    const token = fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        this.bearerToken = JSON.parse(result).access_token;
        return this.bearerToken;
      });
    // добавить обработку ошибок
    return token;
  }

  async loginByPassword(email: string, password: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      header.append('Authorization', `Bearer ${this.bearerToken}`);
      const requestParams = JSON.stringify({
        email,
        password,
      });

      const options = {
        method: 'POST',
        headers: header,
        body: requestParams,
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

  obtainTokenByCredentials() {
    const header = new Headers();
    header.append(
      'Authorization',
      `Basic ${btoa(this.ADMIN_CLIENT_ID.concat(':', this.ADMIN_CLIENT_SECRET))}`
    );
    const requestParams = new URLSearchParams();
    requestParams.append('grant_type', 'client_credentials');
    requestParams.append('scopes', `${this.SCOPES}`);
    const options = {
      method: 'POST',
      headers: header,
      body: requestParams,
    };
    const url = this.AUTH_URL.concat(`/oauth/token?`);
    const token = fetch(url, options)
      .then((response) => response.text())
      .then((result) => {
        this.bearerToken = JSON.parse(result).access_token;
        return this.bearerToken;
      });
    // добавить обработку ошибок
    return token;
  }

  login(email: string = 's.s.star@mail.ru', password: string = 'Aa!12345') {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${this.bearerToken}`);
    const raw = JSON.stringify({
      email,
      password,
      anonymousCart: {
        id: '{{cart-id}}',
        typeId: 'cart',
      },
    });

    const options = {
      method: 'POST',
      headers: header,
      body: raw,
    };
    const url = this.API_URL.concat(`/${this.projectKey}/me/login`);
    return fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    // добавить обработку ошибок
  }

  loginAnonymous() {
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
        return result.access_token;
      });
    // добавить обработку ошибок
  }

  getProducts(params?: GetProductsParams) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const requestParams = new URLSearchParams();

    if (params) {
      if (params.category) requestParams.append('filter', `categories.id:"${params.category}"`);
      if (params.searchText) requestParams.append('text.en-US', params.searchText);
      if (params.sort)
        if (params.sort.param === 'name')
          requestParams.append('sort', `name.en-US ${params.sort.direction.toLowerCase()}`);
        else requestParams.append('sort', `price ${params.sort.direction.toLowerCase()}`);
      if (params.filterPrice)
        requestParams.append(
          'filter.query',
          `variants.price.centAmount:range(${params.filterPrice.higherThen} to ${params.filterPrice.lowerThen})`
        );
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
      response.json().then((products) => {
        const newArr: IProduct[] = [];
        products.results.forEach((product: IProduct, index: number) => {
          newArr[index] = JSON.parse(JSON.stringify(product)) as typeof product;
          if (product.masterVariant.prices[0].discounted) {
            const discount = this.discounts.find(
              (item) => item.id === product.masterVariant.prices[0].discounted.discount.id
            );
            newArr[index].masterVariant.prices[0].discounted.discount = JSON.parse(
              JSON.stringify(discount)
            );
          }
        });
        return newArr;
      })
    );
  }

  async getProductByID(id: string) {
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

        return discountedProduct;
      })
    );
  }

  async getDiscountedProducts() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, `/product-discounts/`);
    return fetch(url, requestOptions).then((response) =>
      response.json().then((result) => {
        return result.results;
      })
    );
    // добавить обработку ошибок
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

  async getCategories(id?: string): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let url = this.API_URL.concat(`/${this.projectKey}/categories`);
    if (id)
      url = this.API_URL.concat(
        `/${this.projectKey}/categories?where=parent%28id+%3D+%22${id}%22%29`
      );
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then((result) => resolve(result));
        } else {
          response.json().then((result) => {
            reject(result.message);
          });
        }
      });
    });
  }

  async getMainCategories(): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat(`/${this.projectKey}/categories?where=parent+is+not+defined`);
    return new Promise((resolve, reject) => {
      fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          response.json().then((result) => resolve(result));
        } else {
          response.json().then((result) => {
            reject(result.message);
          });
        }
      });
    });
  }
}

export const connectionByFetch = new ConnectionByFetch();

import Customer from '../interfaces/customer';
import { IProduct, Idiscount } from '../interfaces/product';

export default class ConnectionByFetch {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES;

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  bearerToken = '';

  currentCustomer: Customer = Object();

  discounts: Idiscount[] = [];

  constructor() {
    this.init();
  }

  async init() {
    const id = localStorage.getItem('id');
    if (!id) await this.loginAnonymous();
    else {
      this.bearerToken = localStorage.getItem('token') || '';
    }
    this.discounts = await this.getDiscountedProducts();
    if (id) this.currentCustomer = await this.getCustumerByID(id);
  }

  // возможно ненужная функция

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

  getProducts(
    limit: number = 20,
    sort: { param: 'name' | ''; direction: 'asc' | 'desc' | '' } = { param: '', direction: '' }
  ) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);
    const requestParams = new URLSearchParams();

    if (sort.param === 'name')
      requestParams.append('sort', `masterData.current.name.en-US ${sort.direction.toLowerCase()}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat(
      '/',
      this.projectKey,
      '/products',
      `?limit=${limit}`,
      `&${requestParams}`
    );

    return fetch(url, requestOptions).then((response) =>
      response.json().then((products) => {
        const newArr: IProduct[] = [];
        products.results.forEach((product: IProduct, index: number) => {
          newArr[index] = JSON.parse(JSON.stringify(product)) as typeof product;
          const discountID =
            product.masterData.current.masterVariant.prices[0].discounted?.discount.id;
          if (discountID) {
            const discount = this.discounts.find((item) => item.id === discountID);
            if (discount)
              newArr[index].discount = JSON.parse(JSON.stringify(discount)) as typeof discount;
          }
        });
        return newArr;
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

  async signUpCustomer(customer: Customer) {
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
    fetch(url, requestOptions);
    // добавить обработку ошибок
  }

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
}

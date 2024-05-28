import { IProduct } from '../interfaces/product';

export default class ConnectionByFetch {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES;

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  bearerToken = '';

  constructor() {
    this.obtainTokenByCredentials();
  }
  // возможно ненужная функция

  obtainTokenByPassword() {
    const header = new Headers();
    header.append(
      'Authorization',
      `Basic ${btoa(this.ADMIN_CLIENT_ID.concat(':', this.ADMIN_CLIENT_SECRET))}`
    );
    const requestParams = new URLSearchParams({
      grant_type: 'password',
      username: 's.s.star@mail.ru',
      password: 'Aa!12345',
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
        console.log(result);
        this.bearerToken = JSON.parse(result).access_token;
        return this.bearerToken;
      })
      .catch((error) => console.error(error));
    return token;
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
        console.log(result);
        this.bearerToken = JSON.parse(result).access_token;
        return this.bearerToken;
      })
      .catch((error) => console.error(error));
    return token;
  }

  login(email: string, password: string) {
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
      })
      .catch((error) => console.error(error));
  }

  loginAnonymous() {
    const header = new Headers();
    header.append(
      'Authorization',
      `Basic ${btoa(this.ADMIN_CLIENT_ID.concat(':', this.ADMIN_CLIENT_SECRET))}`
    );
    const requestParams = new URLSearchParams();
    requestParams.append('grant_type', 'client_credentials');
    const options = {
      method: 'POST',
      headers: header,
      body: requestParams,
    };
    const url = this.AUTH_URL.concat(`/oauth/${this.projectKey}/anonymous/token?`);
    return fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        return result.access_token;
      })
      .catch((error) => console.error(error));
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
    return fetch(url, requestOptions)
      .then((response) =>
        response.json().then((products) => {
          const newArr: IProduct[] = [];
          products.results.forEach((product: IProduct, index: number) => {
            newArr[index] = Object.assign(product);
            if (product.masterData.current.masterVariant.prices[0].discounted) {
              this.getDiscountProductsByID(
                product.masterData.current.masterVariant.prices[0].discounted.discount.id
              ).then((result) => {
                newArr[index].discount = result;
              });
            }
          });
          return newArr;
        })
      )
      .catch((error) => console.log(error));
  }

  getDiscountProductsByID(id: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${this.bearerToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const url = this.API_URL.concat('/', this.projectKey, `/product-discounts/${id}`);
    return fetch(url, requestOptions)
      .then((response) =>
        response.json().then((result) => {
          return result;
        })
      )
      .catch((error) => console.log(error));
  }
}

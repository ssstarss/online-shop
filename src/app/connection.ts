import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export default class Connection {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES.split(' ');

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  authMiddlewareOptions: AuthMiddlewareOptions;

  httpMiddlewareOptions: HttpMiddlewareOptions;

  ctpClient;

  apiRoot;

  constructor() {
    this.authMiddlewareOptions = {
      host: this.AUTH_URL,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.ADMIN_CLIENT_ID,
        clientSecret: this.ADMIN_CLIENT_SECRET,
      },
      scopes: this.SCOPES,
      fetch,
    };

    this.httpMiddlewareOptions = {
      host: this.API_URL,
      fetch,
    };
    this.ctpClient = this.createConnection();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  createConnection() {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
  }

  getProject() {
    return this.apiRoot.get().execute();
  }

  newCustomer(customer: CustomerDraft) {
    const result = this.apiRoot.customers().post({ body: customer }).execute();
    return result;
  }

  login(customerEmail: string, password: string) {
    return this.returnCustomerByEmail(customerEmail)
      .then(({ body }) => {
        if (body.results.length > 0 && body.results[0].password !== password) {
          return body.results[0].id;
        }
        return false;
      })
      .catch((error: Error) => {
        return error;
      });
  }

  returnCustomerByEmail(customerEmail: string) {
    return this.apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${customerEmail}"`,
        },
      })
      .execute();
  }
}

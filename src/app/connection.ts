import {
  // TokenCache,
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  CustomerDraft,
  createApiBuilderFromCtpClient,
  CustomerSignin,
} from '@commercetools/platform-sdk';
import { AuthResponse } from '../interfaces/authResponse';

type PasswordAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    user: {
      username: string;
      password: string;
    };
  };
  scopes?: Array<string>;
  // tokenCache?: TokenCache;
  oauthUri?: string;
  fetch?: any; // eslint-disable-line
};

export default class Connection {
  ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;

  ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;

  SCOPES = process.env.CTP_SCOPES.split(' ');

  AUTH_URL = process.env.CTP_AUTH_URL;

  API_URL = process.env.CTP_API_URL;

  projectKey = process.env.CTP_PROJECT_KEY;

  authMiddlewareOptions: AuthMiddlewareOptions;

  httpMiddlewareOptions: HttpMiddlewareOptions;

  passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions;

  ctpClient;

  ctpClient2;

  apiRoot;
  // tokenCache: TokenCache;

  constructor(login?: string, password?: string) {
    // this.tokenCache = new TokenCache();
    this.projectKey = 'rsschool-green-shop-key';
    this.SCOPES = [
      'view_products:rsschool-green-shop-key view_associate_roles:rsschool-green-shop-key view_customers:rsschool-green-shop-key view_quote_requests:rsschool-green-shop-key view_connectors:rsschool-green-shop-key view_quotes:rsschool-green-shop-key view_customer_groups:rsschool-green-shop-key view_orders:rsschool-green-shop-key view_staged_quotes:rsschool-green-shop-key view_stores:rsschool-green-shop-key view_standalone_prices:rsschool-green-shop-key view_payments:rsschool-green-shop-key view_cart_discounts:rsschool-green-shop-key view_key_value_documents:rsschool-green-shop-key view_business_units:rsschool-green-shop-key view_order_edits:rsschool-green-shop-key manage_orders:rsschool-green-shop-key view_product_selections:rsschool-green-shop-key create_anonymous_token:rsschool-green-shop-key view_tax_categories:rsschool-green-shop-key manage_payments:rsschool-green-shop-key view_categories:rsschool-green-shop-key view_sessions:rsschool-green-shop-key view_messages:rsschool-green-shop-key view_project_settings:rsschool-green-shop-key manage_order_edits:rsschool-green-shop-key view_attribute_groups:rsschool-green-shop-key manage_customers:rsschool-green-shop-key view_shipping_methods:rsschool-green-shop-key view_discount_codes:rsschool-green-shop-key view_states:rsschool-green-shop-key view_import_containers:rsschool-green-shop-key view_published_products:rsschool-green-shop-key view_connectors_deployments:rsschool-green-shop-key view_shopping_lists:rsschool-green-shop-key view_audit_log:rsschool-green-shop-key view_types:rsschool-green-shop-key',
    ];

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

    this.passwordAuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: this.projectKey,
      credentials: {
        clientId: 'r6aJk8t2mER-SsDGxEW0VkK_',
        clientSecret: '1RFF5OrGsPbZjYM5bsC2EJUy0c3exCy8',
        user: {
          username: login!,
          password: password!,
        },
      },
      scopes: this.SCOPES,
      fetch,
    };

    this.ctpClient = this.createConnection();
    this.ctpClient2 = this.createAuthConnection();
    this.apiRoot = createApiBuilderFromCtpClient(this.ctpClient).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  createAuthConnection() {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withPasswordFlow(this.passwordAuthMiddlewareOptions)
      .withLoggerMiddleware()
      .build();
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
    const customerCredentials: CustomerSignin = {
      email: customerEmail,
      password,
    };

    return this.ctpClient2
      .execute({
        uri: `/${this.projectKey}/login`,
        method: 'POST',
        body: JSON.stringify(customerCredentials),
      })
      .then((response: AuthResponse) => {
        return response;
      })
      .catch((error: Error) => {
        throw error;
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

  loginByEmailPassword() {
    this.apiRoot.me().login();
  }
}

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  CustomerDraft,
  createApiBuilderFromCtpClient,
  CustomerSignin,
} from '@commercetools/platform-sdk';

export default class Connection {
  projectKey: string;

  scopes: string[];

  authMiddlewareOptions: AuthMiddlewareOptions;

  httpMiddlewareOptions: HttpMiddlewareOptions;

  ctpClient;

  apiRoot;

  constructor() {
    this.projectKey = 'rsschool-green-shop-key';
    this.scopes = [
      'view_products:rsschool-green-shop-key view_associate_roles:rsschool-green-shop-key view_customers:rsschool-green-shop-key view_quote_requests:rsschool-green-shop-key view_connectors:rsschool-green-shop-key view_quotes:rsschool-green-shop-key view_customer_groups:rsschool-green-shop-key view_orders:rsschool-green-shop-key view_staged_quotes:rsschool-green-shop-key view_stores:rsschool-green-shop-key view_standalone_prices:rsschool-green-shop-key view_payments:rsschool-green-shop-key view_cart_discounts:rsschool-green-shop-key view_key_value_documents:rsschool-green-shop-key view_business_units:rsschool-green-shop-key view_order_edits:rsschool-green-shop-key manage_orders:rsschool-green-shop-key view_product_selections:rsschool-green-shop-key create_anonymous_token:rsschool-green-shop-key view_tax_categories:rsschool-green-shop-key manage_payments:rsschool-green-shop-key view_categories:rsschool-green-shop-key view_sessions:rsschool-green-shop-key view_messages:rsschool-green-shop-key view_project_settings:rsschool-green-shop-key manage_order_edits:rsschool-green-shop-key view_attribute_groups:rsschool-green-shop-key manage_customers:rsschool-green-shop-key view_shipping_methods:rsschool-green-shop-key view_discount_codes:rsschool-green-shop-key view_states:rsschool-green-shop-key view_import_containers:rsschool-green-shop-key view_published_products:rsschool-green-shop-key view_connectors_deployments:rsschool-green-shop-key view_shopping_lists:rsschool-green-shop-key view_audit_log:rsschool-green-shop-key view_types:rsschool-green-shop-key',
    ];

    this.authMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: this.projectKey,
      credentials: {
        clientId: 'r6aJk8t2mER-SsDGxEW0VkK_',
        clientSecret: '1RFF5OrGsPbZjYM5bsC2EJUy0c3exCy8',
      },
      scopes: this.scopes,
      fetch,
    };

    this.httpMiddlewareOptions = {
      host: 'https://api.europe-west1.gcp.commercetools.com',
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

  // login(customerEmail: string, password: string) {
  //   return this.returnCustomerByEmail(customerEmail)
  //     .then(({ body }) => {
  //       if (body.results.length > 0 && body.results[0].password !== password) {
  //         return body.results[0].id;
  //       }
  //       return false;
  //     })
  //     .catch((error: Error) => {
  //       return error;
  //     });
  // }

  login(customerEmail: string, password: string) {
    const customerCredentials: CustomerSignin = {
      email: customerEmail,
      password,
    };

    this.ctpClient
      .execute({
        uri: `/${this.projectKey}/login`,
        method: 'POST',
        body: JSON.stringify(customerCredentials),
      })
      .then((response: JSON) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.error(error);
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

const { createClient } = require('@commercetools/sdk-client');
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createApiBuilderFromCtpClient } = require('@commercetools/typescript-sdk');

const fetch = require('node-fetch');
//require('dotenv').config();

//const { ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET } = process.env;
//const ADMIN_CLIENT_ID = '1SPZ84tOuDgfZ7PEKw_8UjNn';
//const ADMIN_CLIENT_SECRET = '0fmrZNJ_QCovhA7tqLkUzg8yu6Ry97hC';
const ADMIN_CLIENT_ID = 'oTrUKl_Kkxnjb-SCRsoXEpOH';
const ADMIN_CLIENT_SECRET = 'M27hURHAgSr3HoqjjbR_6tDJmuPx2VON';

const projectKey = 'rsschool-project';

// Create a httpMiddleware for the your project AUTH URL
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: ADMIN_CLIENT_ID,
    clientSecret: ADMIN_CLIENT_SECRET,
  },
  scopes: [
    'view_cart_discounts:rsschool-project view_import_containers:rsschool-project view_sessions:rsschool-project view_payments:rsschool-project view_business_units:rsschool-project manage_my_profile:rsschool-project manage_my_payments:rsschool-project view_project_settings:rsschool-project view_key_value_documents:rsschool-project manage_my_shopping_lists:rsschool-project view_product_selections:rsschool-project view_types:rsschool-project view_staged_quotes:rsschool-project view_orders:rsschool-project view_customers:rsschool-project view_connectors_deployments:rsschool-project view_order_edits:rsschool-project view_connectors:rsschool-project view_states:rsschool-project view_shipping_methods:rsschool-project view_messages:rsschool-project view_shopping_lists:rsschool-project view_audit_log:rsschool-project view_stores:rsschool-project view_discount_codes:rsschool-project view_quote_requests:rsschool-project view_products:rsschool-project view_categories:rsschool-project view_published_products:rsschool-project view_tax_categories:rsschool-project manage_my_orders:rsschool-project view_associate_roles:rsschool-project view_quotes:rsschool-project view_customer_groups:rsschool-project view_standalone_prices:rsschool-project view_attribute_groups:rsschool-project manage_customers:rsschool-project',
  ],
  fetch,
});

// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
});

// Create a client using authMiddleware and httpMiddleware
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

// Create a API root from API builder of commercetools platform client
const apiRoot = createApiBuilderFromCtpClient(client);

const sdkProductsList = () => {
  return apiRoot.withProjectKey({ projectKey }).products().get().execute();
};

/*(async () => {
  try {
    await apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .get()
      .execute()
      .then((data) => {
        console.log('Project information --->', JSON.stringify(data));
      })
      .catch((error) => {
        console.log('ERROR --->', error);
      });
  } catch (error) {
    console.log('ERROR --->', error);
  }
  console.log('Got project information');
})();*/

/*const createCustomer = () => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: {
        email: 'sdk@example.com',
        password: 'examplePassword',
      },
    })
    .execute();
};
createCustomer()
  .then(({ body }) => {
    console.log(body.customer.id);
  })
  .catch(console.error);*/

export default sdkProductsList;

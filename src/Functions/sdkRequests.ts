const { createClient } = require('@commercetools/sdk-client');
const {
  createAuthMiddlewareForClientCredentialsFlow,
} = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createApiBuilderFromCtpClient } = require('@commercetools/typescript-sdk');

const fetch = require('node-fetch');
// require('dotenv').config();

// const { ADMIN_CLIENT_ID, ADMIN_CLIENT_SECRET } = process.env;
const ADMIN_CLIENT_ID = process.env.CTP_CLIENT_ID;
const ADMIN_CLIENT_SECRET = process.env.CTP_CLIENT_SECRET;
const SCOPES = process.env.CTP_SCOPES.split(' ');
const AUTH_URL = process.env.CTP_AUTH_URL;
const API_URL = process.env.CTP_API_URL;

const projectKey = process.env.CTP_PROJECT_KEY;

// Create a httpMiddleware for the your project AUTH URL
const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: AUTH_URL,
  projectKey,
  credentials: {
    clientId: ADMIN_CLIENT_ID,
    clientSecret: ADMIN_CLIENT_SECRET,
  },
  scopes: SCOPES,
  fetch,
});

// Create a httpMiddleware for the your project API URL
const httpMiddleware = createHttpMiddleware({
  host: API_URL,
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

/* (async () => {
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
})(); */

/* const createCustomer = () => {
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
  .catch(console.error); */

export default sdkProductsList;

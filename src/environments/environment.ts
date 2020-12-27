export const environment = {
  production: false,
  graphql_uri: 'http://localhost:3000/api/cookiez',
  auth0: {
    domain: 'cookiez.us.auth0.com',
    client: 'MBX2b3srvcNOL1G390GGdzPcMWtfFMEn',
    audiance: 'https://cookiez.com/api/v1/',
    scope: 'openid profile email',
    token_type: 'Bearer',
  },
};

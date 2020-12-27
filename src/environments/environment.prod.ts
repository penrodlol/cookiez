export const environment = {
  production: true,
  graphql_uri: 'https://cookiez-func.azurewebsites.net/api/cookiez',
  auth0: {
    domain: 'cookiez.us.auth0.com',
    client: 'MBX2b3srvcNOL1G390GGdzPcMWtfFMEn',
    audiance: 'https://cookiez.com/api/v1/',
    scope: 'openid profile email',
    token_type: 'Bearer',
  },
};

const auth0 = require("auth0-js");

const webAuth = new auth0.WebAuth({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  responseType: "token id_token",
  redirectUri: process.env.AUTH0_CALLBACK_URL,
});

module.exports = webAuth;

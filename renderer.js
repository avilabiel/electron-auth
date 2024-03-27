const webAuth = require("./auth");

document.getElementById("btn-login").addEventListener("click", function () {
  console.log("Login button clicked");
  webAuth.authorize();
});

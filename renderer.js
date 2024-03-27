// next step: display user info from Auth0

document.getElementById("btn-login").addEventListener("click", function () {
  console.log("Login button clicked");
  window.renderer.sendLoginMessage();
});

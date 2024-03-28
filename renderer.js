// next step: display user info from Auth0

document.getElementById("btn-login").addEventListener("click", function () {
  console.log("Login button clicked");
  window.renderer.sendLoginMessage();
});

window.renderer.showWelcomeMessage((event, account) => {
  console.log("Hey show welcome message event", account);

  if (!account) return;

  cardDiv.style.display = "initial";
  welcomeDiv.innerHTML = `Welcome ${account.name}`;
  signInButton.hidden = true;
  signOutButton.hidden = false;
});

document
  .getElementById("btn-login-simple-url")
  .addEventListener("click", function () {
    console.log("Simple url button clicked");
    window.renderer.openSimpleAuth0Url();
  });

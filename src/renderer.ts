// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var form = document.querySelector('form[id="login-credentials"]');
var email: any = document.querySelector('input[id="email-input"]');
var password: any = document.querySelector('input[id="password-input"]');
var accountlistbutton = document.querySelector('button[id="account-list-button"]');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    var index = email.value.indexOf('@');
    var login = email.value.substring(0, index);
    var domain = "https://" + email.value.substring(index + 1);

    window.addServer([domain, login, password.value])
})

accountlistbutton.addEventListener("click", () => {
    window.openAccountList()
});
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require("electron");

var button = document.getElementById('addserver');
var url = document.getElementById('server-input');
var user = document.getElementById('user-input');
var password = document.getElementById('password-input');

button.addEventListener('click', () => {
    console.log(url.value)

    window.addServer([url.value, user.value, password.value])
})
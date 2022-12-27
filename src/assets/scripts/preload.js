const { ipcRenderer } = require("electron");

ipcRenderer.on('fillCreds', (event, args) => {

    ipcRenderer.send('log', "hello from the other side")
    console.log("data received")
    var usernameinput = document.querySelector('input[name="_username"]')
    usernameinput.value = args[1]
    var passwordinput = document.querySelector('input[name="_password"]')
    passwordinput.value = args[2]

    var form = document.querySelector('form[class="login-form"]')
    form.submit();

    console.log("data received")
})
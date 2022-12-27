
const { ipcRenderer } = require("electron");

var accountdiv = document.querySelector('div[id="accounts"]');

ipcRenderer.once('load-accounts', (event, args) => {
    ipcRenderer.invoke("getValue", "accounts").then((data) => {
        console.log('Request succeeded with JSON response', data)
        data.forEach(element => {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = element.address;
            btn.addEventListener("click", () => {
                ipcRenderer.send('log', "here we go again " + btn.innerHTML)
                ipcRenderer.send('openIServWindow', btn.innerHTML)
            });

            accountdiv.appendChild(btn)
        });
    })
    ipcRenderer.send('log', "finsihed loading ")

})


// All of the Node.js APIs are available in the preload process.

import { ipcRenderer} from "electron";

// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  /*
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  */
})

declare global {
  interface Window {
    addServer: any
    openAccountList: any
  }
}



window.addServer = function(val: any) {
  ipcRenderer.send('add-server', val)
}

window.openAccountList = function() {
  ipcRenderer.send('openAccountList')
}
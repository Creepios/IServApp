// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, Menu, ipcRenderer} = require('electron')
const path = require('path')

const Store = require('electron-store');
const store = new Store();

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('https://hgw-iserv.de')
  // Open the DevTools.
  ipcMain.on('add-server', (event, args) => {
    console.log("add-server")
    addServer(args[0], args[1], args[2])
    createIServWindow(args)
  })

  ipcMain.on('openAccountList', (event, args) => {
    const accountListWindow = new BrowserWindow({
      width: 1200,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    
    accountListWindow.loadFile("./pages/account-list/index.html")

    accountListWindow.webContents.on('did-finish-load', function (event, input) {
      accountListWindow.webContents.send('load-accounts')
    })
  })

  ipcMain.handle('getValue', (event, key) => {
    return store.get(key);
  })

  ipcMain.on('setValue', (event, args) => {
    store.set(args[0], args[1]);
  })

  ipcMain.on('openIServWindow', (event, address) => {
    createIServWindow(getIServDataByAddress(address))
  })

}

function getIServDataByAddress(address) {
  var accounts = store.get("accounts", "[]")
  for (let account in accounts) {
    console.log(account)

    if (account["address"] == address) {
      return account;
    }
  }

}


function addServer(serveraddress, username, password) {
  var accounts = JSON.parse(store.get("accounts", "[]"))
  accounts.push({
    "address": serveraddress,
    "username": username,
    "password": password
  })

  store.set("accounts", accounts)
}


/**
 * 
 * @param {Array} args 
 */
function createIServWindow(account) {
  const iservWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'scripts', 'preload.js')
    }
  })

  iservWindow.webContents.openDevTools();
  iservWindow.webContents.on('did-finish-load', function (event, input) {
    var url = iservWindow.webContents.getURL();
    console.log(url);
    // More complex code to handle tokens goes here

    if (url.includes("/iserv/app/login")) {
      console.log("on iserv" + url);
      iservWindow.webContents.send('fillCreds', account)
    }
});

  
  iservWindow.loadURL(account["address"]);/*.then(() => {
    console.log("on iserv")
    iservWindow.webContents.send('fillCreds', args)
  });
  */

  
}

ipcMain.on('log', (event, arguments) => {
  console.log(arguments)
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

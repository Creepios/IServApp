// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

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
    createIServWindow(args)
  })

}

function createIServWindow(args) {
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
      iservWindow.webContents.send('fillCreds', args)
    }
});

  
  iservWindow.loadURL(args[0]);/*.then(() => {
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

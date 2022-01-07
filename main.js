const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron')
const path = require('path')
// const updater = require("electron-updater");
// const autoUpdater = updater.autoUpdater;

let progressInterval
let tray
let win
let wen
let mainWindow

function createWindow () {
  win = new BrowserWindow({
    width: 400,
    height: 588,
    show: true,
    icon: __dirname + '/img/android-icon-192x192.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    frame: true
    
  })

  win.setResizable(false)
  win.setMaximizable(false)

  // win.webContents.loadURL('https://stage3.abeille.com/chat')
  win.loadFile('./login/login.html')
}

function createChildWindow() {
  childWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    modal: true,
    show: false,
    parent: mainWindow, // Make sure to add parent window here
  
    // Make sure to add webPreferences with below configuration
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  
  // Child window loads settings.html file
  childWindow.loadFile("index.html");
  
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
}
  
ipcMain.on("openChildWindow", (event, arg) => {
  createChildWindow();
});

app.whenReady().then(() => {
  createWindow()
  // createLoadingWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  const icon = nativeImage.createFromPath('/img/android-icon-192x192.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Ceci est mon application')
  tray.setTitle('Ceci est mon titre')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function createLoadingWindow() {
  wen = new BrowserWindow({
    width: 400,
    height: 588,
    icon: __dirname + '/img/android-icon-192x192.png',
    autoHideMenuBar: true,
  })
  wen.webContents.loadFile('./login/login.html')
  wen.setResizable(false)
  wen.setMaximizable(false)
}

// autoUpdater.on('checking-for-update', function () {
//   sendStatusToWindow('Checking for update...');
// });

// autoUpdater.on('update-available', function (info) {
//   sendStatusToWindow('Update available.');
// });

// autoUpdater.on('update-not-available', function (info) {
//   sendStatusToWindow('Update not available.');
// });

// autoUpdater.on('error', function (err) {
//   sendStatusToWindow('Error in auto-updater.');
// });

// autoUpdater.on('download-progress', function (progressObj) {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// });

// autoUpdater.on('update-downloaded', function (info) {
//   sendStatusToWindow('Update downloaded; will install in 1 seconds');
// });

// autoUpdater.on('update-downloaded', function (info) {
//   setTimeout(function () {
//       autoUpdater.quitAndInstall();
//   }, 1000);
// });

// function checkForUpdates(){
//   const data = {
//       'provider': 'github',
//       'owner':    'vkiranmaniya',
//       'repo':     'exchange',
//       'token':    'YOUR_PERSONAL_TOKEN_HERE'
//     };
//   autoUpdater.setFeedURL(data);
//   autoUpdater.checkForUpdates();
// }

// function sendStatusToWindow(message) {
//   console.log(message);
// }

// module.exports = {
//   checkForUpdates,
// }

// In main process.
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
  if (arg === 'close') {
    app.quit()
  } else if (arg === 'winReduce') {
    win.minimize()
  } else if (arg === 'wenClose') {
    win.close()
    win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      icon: __dirname + '/img/android-icon-192x192.png',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      },
      autoHideMenuBar: true,
      frame: false
    })
  
    win.maximize()
  
    // win.webContents.loadURL('https://stage3.abeille.com/chat')
    win.loadFile('./index.html')
  }
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
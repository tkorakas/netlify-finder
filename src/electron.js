const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const path = require("path");
const isDev = require("electron-is-dev");
const auth = require('./netlify/auth');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

electron.ipcMain.on('netlify-oauth', (event, arg) => {
  const windowParams = {
    alwaysOnTop: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    }
  };

  const oauthConfig = {
    clientId: '8f950daaf3ca497da38c1349af513a788859321e74c66d0103ed412de2e8aec4',
    clientSecret: '1f30616859cf803f9ad3055a477eeaa222dfe559ae52bc998064c393ccfe1584',
    authorizationUrl: 'https://app.netlify.com/authorize',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
  };

  const netlify = auth(oauthConfig, windowParams);
  netlify.getAccessToken({})
    .then(token => {
      event.sender.send('oauth-reply', token);
    })
    .catch(console.log)
});

electron.ipcMain.on('file-dialog', (event, arg) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, (filePaths) => {
    event.sender.send('file-dialog', filePaths);
  });
});

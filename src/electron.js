const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const path = require("path");
const isDev = require("electron-is-dev");
const auth = require("./netlify/auth");
const authConfig = require("./config/netlify");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 900
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:9999"
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

electron.ipcMain.on("netlify-oauth", (event, arg) => {
  const windowParams = {
    alwaysOnTop: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    }
  };

  auth(authConfig, windowParams)
    .then(token => {
      event.sender.send("oauth-reply", token);
    })
    .catch(console.log);
});

electron.ipcMain.on("file-dialog", (event, arg) => {
  dialog.showOpenDialog(
    mainWindow,
    {
      properties: ["openDirectory"]
    },
    filePaths => {
      event.sender.send("file-dialog", filePaths);
    }
  );
});

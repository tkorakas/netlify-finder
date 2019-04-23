const nodeUrl = require("url");
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;
let state = null;
let authWindow;

function getAccessToken(config, windowParams) {
  state = Math.random();
  const { authorizationUrl, clientId, redirectUri } = config;
  const url = `${authorizationUrl}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=${state}`;
  return new Promise(function(resolve, reject) {
    authWindow = new BrowserWindow(
      windowParams || { "use-content-size": true }
    );

    authWindow.loadURL(url);
    authWindow.show();

    authWindow.on("closed", () => {
      reject("Window was closed by user");
    });
    authWindow.webContents.on("will-navigate", (event, url) => {
      getAccessTokenFromUrl(url, resolve, reject);
    });

    authWindow.webContents.on(
      "did-get-redirect-request",
      (event, oldUrl, newUrl) => {
        getAccessTokenFromUrl(newUrl, resolve, reject);
      }
    );
  });
}

function getAccessTokenFromUrl(url, resolve, reject) {
  if (!url) return;
  const urlParts = nodeUrl.parse(url, true);

  if (!urlParts.hash) {
    reject("No hash");
  }

  const query = handleAccessToken(urlParts.hash);

  if (query.error) {
    reject(query.error);
  }

  resolve(query.access_token);
  authWindow.removeAllListeners("closed");
  authWindow.close();
}

function handleAccessToken(hash) {
  return hash
    .replace(/^#/, "")
    .split("&")
    .reduce((result, pair) => {
      const keyValue = pair.split("=");
      result[keyValue[0]] = keyValue[1];
      return result;
    }, {});
}

module.exports = getAccessToken;

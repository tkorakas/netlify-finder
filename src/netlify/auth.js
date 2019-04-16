'use strict';
const Promise = require('pinkie-promise') ;
const nodeUrl = require('url');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow || electron.remote.BrowserWindow;

module.exports = function (config, windowParams) {
  function getAccessToken(opts) {
    opts = opts || {};

    var url = 'https://app.netlify.com/authorize?client_id=8f950daaf3ca497da38c1349af513a788859321e74c66d0103ed412de2e8aec4&response_type=token&redirect_uri=http://localhost&state=0.5779583767358962';

    return new Promise(function (resolve, reject) {
      const authWindow = new BrowserWindow(windowParams || {'use-content-size': true});

      authWindow.loadURL(url);
      authWindow.show();

      authWindow.on('closed', () => {
        reject(new Error('window was closed by user'));
      });

      function onCallback(url) {
        if (!url) return;
        var code = null;
        var url_parts = nodeUrl.parse(url, true);
        if (url_parts.hash) {
          var query = handleAccessToken(url_parts.hash);
          console.log(query)
          var code = query.access_token;
          var error = query.error;
        }

        if (error !== undefined) {
          reject(error);
          authWindow.removeAllListeners('closed');
          setImmediate(function () {
            authWindow.close();
          });
        } else if (code) {
          resolve(code);
          authWindow.removeAllListeners('closed');
          setImmediate(function () {
            authWindow.close();
          });
        }
      }

      authWindow.webContents.on('will-navigate', (event, url) => {
        onCallback(url);
      });

      authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        onCallback(newUrl);
      });
    });
  }

  // The access token is returned in the hash part of the document.location
  //   #access_token=1234&response_type=token
  function handleAccessToken(hash) {
    const response = hash.replace(/^#/, '').split('&').reduce((result, pair) => {
      const keyValue = pair.split('=');
      result[keyValue[0]] = keyValue[1];
      return result;
    }, {});

    return response;
  }

  return {
    getAccessToken: getAccessToken
  };
};

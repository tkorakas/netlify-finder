import React, { Component } from "react";
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import {
  Route,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './components/PrivateRoute';
import Sites from './containers/Sites';
import Login from './containers/Login';
import SiteManagement from './containers/SiteManagement';
import { setToken } from "./netlify/api";
import configureStore, { history } from './store'
import { Provider } from 'react-redux';

ipcRenderer.on('oauth-reply', (event, data) => {
  localStorage.setItem('netlify-token', data);
  setToken(data);
});

const defaultState = {
  settings: {
    newSiteModalVisivle: false,
    sitesLoading: false
  },
  // requiredFiles: [],
  sites: [],
  // uploading: false,
  // uploadingFile: '',
  // loading: true,
  // createSiteModalVisible: false
};

const store = configureStore(defaultState);
console.log(store.getState(), 'initial state');
store.subscribe(() => console.log(store.getState()))

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('netlify-token');
    if (token) {
      setToken(token);
    }
  }

  render() {
    return (
      <div className="ui container">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <PrivateRoute exact path='/' component={Sites} />
            <PrivateRoute exact path='/site/:id' component={SiteManagement} />
            <Route path='/login' component={Login} />
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

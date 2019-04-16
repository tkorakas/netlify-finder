import React, {Component} from 'react';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default class Login extends Component {

  showLoginWindow() {
    ipcRenderer.send('netlify-oauth');
  }

  render() {
    const token = localStorage.getItem('netlify-token');
    if (token) {
      return <Redirect to="/" />
    }
    return (
      <Button type="primary" onClick={this.showLoginWindow}>Login to Netlify!</Button>
    );
  }
}
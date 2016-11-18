import React, { Component } from 'react';
import logo from './toped.gif';
import './App.css';
import icon from './tokopedia-logo-text.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tokopedia Lite</h2>
        </div>
        <p className="App-intro">
          Home page will be here.
        </p>
        <img src={icon} className="Content-logo"/>
      </div>
    );
  }
}

export default App;

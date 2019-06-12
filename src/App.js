import React, { Component } from "react";
import Reader from './reader';
import Writer from "./writer";
import Display from './display';
import TopBar from './topbar';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/index.js';

class App extends Component {


  render() {

      return (
          <Provider store={store}>
              <div className="App">
                  <TopBar />
                  <div className="container">
                      <div className="row">
                          <Reader />
                          <Writer />
                      </div>
                    <div className="row">
                        <Display   />
                    </div>
                  </div>
              </div>
          </Provider>
      );
  }

}

export default App;
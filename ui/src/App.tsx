import React from 'react';
import './App.css';
import Home from './components/Home';
import Settings from './components/Settings';
import Accounts from './components/Accounts';
import Navigation from './components/Navigation';
import Debugger from './components/Debugger';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/debug">
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Home />
            </div>
          </div>
        </Route>
        <Route path="/accounts" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Accounts />
            </div>
          </div>
        </Route>
        <Route path="/settings" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Settings />
            </div>
          </div>
        </Route>
        <Route path="/:txHash">
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Debugger />
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

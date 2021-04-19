import React from 'react';
import './App.css';
import Home from './components/Home';
import Settings from './components/Settings';
import Accounts from './components/Accounts';
import Navigation from './components/Navigation';
import Debugger from './components/Debugger';

import { useState } from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [port, setPort] = useState<number>(7545);
  const [rpc, setRpc] = useState<string>('localhost');

  return (
    <BrowserRouter basename="/debug">
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Home port={port} />
            </div>
          </div>
        </Route>
        <Route path="/accounts" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Accounts port={port} />
            </div>
          </div>
        </Route>
        <Route path="/settings" exact>
          <div className="App">
            <div className="App-body">
              <Navigation />
              <Settings port={port} setPort={setPort} rpc={rpc} setRpc={setRpc} />
            </div>
          </div>
        </Route>
        <Route path="/:txHash/:port">
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

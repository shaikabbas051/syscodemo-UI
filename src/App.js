import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./HomeContainer/form.js";
import Records from "./HomeContainer/index.js";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Form} />
          <Route path="/list" component={Records} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

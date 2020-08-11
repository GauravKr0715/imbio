import React from "react";
import NavBarMine from "./components/NavBarMine";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import UserDisplay from "./components/UserDisplay";
import Home from "./components/Home";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBarMine />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/user/:user_name" component={UserDisplay} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

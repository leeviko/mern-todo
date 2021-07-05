import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { loadUser } from "./actions/authActions";

import './App.css';

import Sidebar from "./components/Sidebar";
import Todos from "./components/Todos";
import About from "./components/About";



const  App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]) 

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

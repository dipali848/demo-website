import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./screens/home.js";
import ViewImage from "./screens/viewImage";

export default function App() {
  
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/viewImage" component={ViewImage} exact />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

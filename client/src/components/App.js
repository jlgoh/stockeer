import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

import Header from "./Header";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { fetchUser } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/signup" exact component={SignupForm} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);

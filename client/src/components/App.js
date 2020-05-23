import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "../history";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Home";
import Loading from "./Loading";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import WatchPage from "./WatchPage";
import SearchPage from "./SearchPage";
import { fetchUser } from "../actions";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderRedirect = (pathname) => {
    return (
      <Redirect
        to={{
          pathname,
          state: { referrer: "Please login first" },
        }}
      />
    );
  };

  renderRestrictedComponent = (Component) => (props) => {
    switch (this.props.auth) {
      case null:
        return <Loading {...props} />;
      case false:
        return this.renderRedirect("/login");
      default:
        return <Component {...props} />;
    }
  };

  renderPublicComponent = (Component) => (props) => {
    switch (this.props.auth) {
      case null:
        return <Loading {...props} />;
      case false:
        return <Component {...props} />;
      default:
        return this.renderRedirect("/");
    }
  };

  render() {
    return (
      <div className="pusher">
        <div>
          <Router history={history}>
            <div>
              <Header />
              <Sidebar />
              <Route path="/" exact component={Home} />
              <Route
                path="/login"
                exact
                render={this.renderPublicComponent(LoginForm)}
              />
              <Route
                path="/signup"
                exact
                render={this.renderPublicComponent(SignupForm)}
              />
              <Route
                exact
                path="/search"
                render={this.renderRestrictedComponent(SearchPage)}
              />
              <Route
                exact
                path="/watchlist"
                render={this.renderRestrictedComponent(WatchPage)}
              />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchUser })(App);

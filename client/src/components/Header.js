import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      case null: //When booting up
        return;
      case false: //When not logged in
        return (
          <div className="ui simple dropdown item">
            Login <i className="dropdown icon" />
            <div className="menu">
              <a href="/auth/google" className="fluid ui secondary button">
                Login with Google
              </a>
              <Link to="/login" className="fluid ui secondary button">
                Login with Username
              </Link>
            </div>
          </div>
        );
      default:
        //When logged in
        return (
          <a className="item" href="/api/logout">
            Logout
          </a>
        );
    }
  }
  render() {
    return (
      <div className="ui borderless inverted menu">
        <Link to="/" className="active item">
          App Name
        </Link>
        <div className="inverted secondary right menu">
          {this.renderContent()}
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

export default connect(mapStateToProps)(Header);

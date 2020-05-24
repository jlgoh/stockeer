import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSideBar } from "../actions";

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
    const { toggleSideBar } = this.props;
    return (
      <div
        className="ui borderless inverted menu"
        style={{ borderRadius: "0", marginBottom: "0" }}
      >
        <div className="ui dropdown item" onClick={() => toggleSideBar(true)}>
          <i className="bars icon" style={{ color: "white" }}></i>
        </div>

        <Link to="/" className="active item">
          <i className="gripfire icon" style={{ color: "white" }}></i>
          Stocky
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

export default connect(mapStateToProps, { toggleSideBar })(Header);

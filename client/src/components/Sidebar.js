import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { toggleSideBar } from "../actions";

const SIDEBAR_LOGGED_OUT_BUTTONS = [
  { label: "Signup", pathname: "/signup" },
  { label: "Login", pathname: "/login" },
];

const SIDEBAR_LOGGED_IN_BUTTONS = [
  { label: "Search", pathname: "/search" },
  { label: "Watchlist", pathname: "/watchlist" },
];

class SidebarComponent extends React.Component {
  toggleSideBar = () => this.props.toggleSideBar(false);

  renderSidebarButtons() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return SIDEBAR_LOGGED_OUT_BUTTONS.map((button) => {
          return (
            <Menu.Item
              style={{ padding: "0.7em 1.14285714em" }}
              key={button.label}
            >
              <Link to={button.pathname} onClick={this.toggleSideBar}>
                {button.label}
              </Link>
            </Menu.Item>
          );
        });
      default:
        return SIDEBAR_LOGGED_IN_BUTTONS.map((button) => {
          return (
            <Menu.Item
              style={{ padding: "0.7em 1.14285714em" }}
              key={button.label}
            >
              <Link to={button.pathname} onClick={this.toggleSideBar}>
                {button.label}
              </Link>
            </Menu.Item>
          );
        });
    }
  }

  render() {
    const { toggleSideBar, sidebar } = this.props;
    return (
      <Sidebar
        as={Menu}
        animation="push"
        icon="labeled"
        inverted
        onHide={() => toggleSideBar(false)}
        vertical
        visible={sidebar}
        width="thin"
      >
        <div>
          <Menu.Item className="item" style={{ padding: "1.5em 1.14285714em" }}>
            <Link to="/" onClick={this.toggleSideBar}>
              <h3>
                <Icon name="magic" /> Stocky
              </h3>
            </Link>
          </Menu.Item>
          {this.renderSidebarButtons()}
        </div>
      </Sidebar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    sidebar: state.sidebar,
  };
};

export default connect(mapStateToProps, { toggleSideBar })(SidebarComponent);

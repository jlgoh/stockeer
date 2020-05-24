import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Menu } from "semantic-ui-react";
import { toggleSideBar } from "../actions";

class SidebarComponent extends React.Component {
  toggleSideBar = () => this.props.toggleSideBar(false);

  renderSidebarButtons() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <Menu.Item>
              <Link to="/" className="item" onClick={this.toggleSideBar}>
                Stock
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup" className="item" onClick={this.toggleSideBar}>
                Signup
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login" className="item" onClick={this.toggleSideBar}>
                Login
              </Link>
            </Menu.Item>
          </div>
        );
      default:
        return (
          <div>
            <Menu.Item>
              <Link to="/" className="item" onClick={this.toggleSideBar}>
                Stock
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/search" className="item" onClick={this.toggleSideBar}>
                Search
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/watchlist"
                className="item"
                onClick={this.toggleSideBar}
              >
                Watchlist
              </Link>
            </Menu.Item>
          </div>
        );
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
        {this.renderSidebarButtons()}
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

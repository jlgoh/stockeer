import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Sidebar extends React.Component {
  renderSidebarButtons() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <div className="item">
              <h3 className="item toggler">
                <Link to="/">Stocky</Link>
              </h3>
            </div>
            <Link to="/signup" className="item toggler">
              Signup
            </Link>
            <Link to="/login" className="item toggler">
              Login
            </Link>
          </div>
        );
      default:
        return (
          <div>
            <div className="item">
              <h3 className="item toggler">
                <Link to="/">Stocky</Link>
              </h3>
            </div>
            <Link to="/search" className="item toggler">
              Search
            </Link>
            <Link to="/watchlist" className="item toggler">
              Watchlist
            </Link>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <div className="ui sidebar inverted vertical menu">
          {this.renderSidebarButtons()}
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

export default connect(mapStateToProps)(Sidebar);

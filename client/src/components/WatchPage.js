import React from "react";
import { connect } from "react-redux";
import { getBookmarks } from "../actions";
import WatchItem from "./WatchItem";
import Loading from "./Loading";

class WatchPage extends React.Component {
  renderBookmarks() {
    return Object.keys(this.props.bookmarks).map((bookmark) => (
      <WatchItem
        key={bookmark}
        term={bookmark}
        name={this.props.bookmarks[bookmark].companyName}
      />
    ));
  }

  render() {
    if (this.props.stocks["ERROR"]) {
      return (
        <div className="ui container" style={{ marginTop: "10px" }}>
          <div className="ui red message">{this.props.stocks["ERROR"]}</div>
        </div>
      );
    }

    if (!this.props.bookmarks) return <Loading />;

    if (Object.keys(this.props.bookmarks).length === 0) {
      return (
        <div style={{ height: "100vh", marginTop: "10px" }}>
          <div className="ui message">
            <div className="header">
              You do not have any tickers symbols on your watchlist
            </div>
            <ul className="list">
              <li>
                <a href="/search">Search for a ticker symbol</a>
              </li>
              <li>
                Click on <i className="bookmark outline icon" />
                to add to watchlist
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div
        className="ui container"
        style={{
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <h1 className="ui  header" style={{ marginTop: "10px" }}>
          <i className="bookmark icon" />
          <div className="content">My Watchlist</div>
        </h1>

        <div className="ui celled list">{this.renderBookmarks()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks,
    stocks: state.stocks,
  };
};

export default connect(mapStateToProps, { getBookmarks })(WatchPage);

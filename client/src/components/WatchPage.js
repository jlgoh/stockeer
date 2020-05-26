import React from "react";
import { connect } from "react-redux";
import { getBookmarks } from "../actions";
import ChartWrapper from "./charts/ChartWrapper";

class WatchPage extends React.Component {
  componentDidMount() {
    this.props.getBookmarks();
  }

  renderBookmarks() {
    return Object.keys(this.props.bookmarks).map((bookmark) => (
      <ChartWrapper key={bookmark} term={bookmark} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderBookmarks()}
        {/* {removeOptionType()} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmarks,
  };
};

export default connect(mapStateToProps, { getBookmarks })(WatchPage);

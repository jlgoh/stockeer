import React from "react";
import { fetchStock, getBookmarks } from "../../actions";
import { connect } from "react-redux";
import Chart from "./Chart";
import Loading from "../Loading";
import ChartHeader from "./ChartHeader";

import _ from "lodash";
import { TypeChooser } from "react-stockcharts/lib/helper";

const TABS = {
  "1D": false,
  "5D": false,
  "1M": false,
  "3M": false,
  "6M": false,
};

class ChartWrapper extends React.Component {
  //Show 5 Months Tab by default
  state = { ...TABS, "6M": true };

  componentDidMount() {
    if (!(`${this.props.term}_DAILY` in this.props.stocks))
      this.props.fetchStock("DAILY", this.props.term);
  }

  componentDidUpdate(prevProps) {
    //Fetch intraday stock if it is not in store and if user is on 1D tab AND not ERROR
    if (
      !(`${this.props.term}_INTRADAY` in this.props.stocks) &&
      this.state["1D"] &&
      !this.props.stocks["ERROR"]
    ) {
      this.props.fetchStock("INTRADAY", this.props.term);
    }

    //Fetch stock only if search term has changed AND if stock is not in store
    if (
      prevProps.term !== this.props.term &&
      !(`${this.props.term}_DAILY` in this.props.stocks)
    ) {
      this.props.fetchStock("DAILY", this.props.term);
    }

    //Fetch stock again if store currently stores ERROR
    //AND that new search term is in already store to update ERROR to false
    if (
      `${this.props.term}_DAILY` in this.props.stocks &&
      this.props.stocks["ERROR"] &&
      prevProps.stocks["ERROR"]
    ) {
      this.props.fetchStock("DAILY", this.props.term);
    }
  }

  renderTabs() {
    return _.map(TABS, (active, tab) => {
      return (
        <div
          key={tab}
          style={{ cursor: "pointer" }}
          className={`${this.state[tab] ? "active" : ""} item`}
          onClick={() => this.setState({ ...TABS, [tab]: true })}
        >
          {tab}
        </div>
      );
    });
  }

  sliceData(time) {
    const fullData = this.props.stocks[`${this.props.term}_DAILY`];
    switch (time) {
      case "1D":
        return this.props.stocks[`${this.props.term}_INTRADAY`];
      case "5D":
        return _.takeRight(fullData, 5);
      case "1M":
        return _.takeRight(fullData, 20);
      case "3M":
        return _.takeRight(fullData, 60);
      case "6M":
        return fullData;
      default:
        return fullData;
    }
  }

  render() {
    //Check whether search is valid
    if (this.props.stocks["ERROR"]) {
      return (
        <div className="ui container" style={{ marginTop: "10px" }}>
          <div className="ui red message">{this.props.stocks["ERROR"]}</div>
        </div>
      );
    }

    //If object store is empty (Loading) or stock is not in store (Subsequent queries)
    if (!(`${this.props.term}_DAILY` in this.props.stocks)) {
      return (
        <div className="ui segment">
          <Loading />
        </div>
      );
    }

    if (
      !(`${this.props.term}_INTRADAY` in this.props.stocks) &&
      this.state["1D"]
    ) {
      return <Loading />;
    }

    const activeTab = Object.keys(this.state).filter(
      (key) => this.state[key]
    )[0];

    return (
      <div>
        <div
          className="ui top attached tabular menu"
          style={{ marginTop: "10px" }}
        >
          {this.renderTabs()}
        </div>
        <div className="ui bottom attached active tab segment">
          <div className="ui container types">
            <ChartHeader term={this.props.term} />
            <TypeChooser>
              {(type) => (
                <Chart
                  type={type}
                  xAxisType={activeTab}
                  data={this.sliceData(activeTab)}
                />
              )}
            </TypeChooser>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    bookmarks: state.bookmarks,
  };
};

export default connect(mapStateToProps, {
  fetchStock,
  getBookmarks,
})(ChartWrapper);

import React from "react";
import { fetchStock } from "../../actions";
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
  "5M": false,
};

class ChartWrapper extends React.Component {
  //Show 5 Months Tab by default
  state = { ...TABS, "5M": true };

  componentDidMount() {
    this.props.fetchStock("DAILY", this.props.term);
  }

  componentDidUpdate(prevProps) {
    //Fetch intraday stock
    if (
      !(`${this.props.term}_INTRADAY` in this.props.stocks) &&
      this.state["1D"]
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
      case "5M":
        return fullData;
      default:
        return fullData;
    }
  }

  render() {
    //If object store is empty (Loading) or stock is not in store (Subsequent queries)
    if (!(`${this.props.term}_DAILY` in this.props.stocks)) {
      return <Loading />;
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
        <div className="ui top attached tabular menu">{this.renderTabs()}</div>
        <div className="ui bottom attached active tab segment">
          <div className="ui container">
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
  };
};

export default connect(mapStateToProps, { fetchStock })(ChartWrapper);

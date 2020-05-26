import React from "react";
import { connect } from "react-redux";

class ChartHeader extends React.Component {
  getRecentStocks() {
    //Array containing closing prices for last 2 days
    return this.props.stocks[`${this.props.term}_DAILY`]
      .slice(-2)
      .map((stock) => stock.close);
  }

  getChange(recentStocks) {
    return (recentStocks[1] - recentStocks[0]).toFixed(2);
  }

  getPercentageChange(recentStocks) {
    return ((this.getChange(recentStocks) / recentStocks[0]) * 100).toFixed(2);
  }

  render() {
    const recentStocks = this.getRecentStocks();
    return (
      <div
        className="ui center aligned dividing icon header"
        style={{ padding: "0.5rem" }}
      >
        <div className="sub header">
          {this.props.term}
          <h2 className="ui huge header" style={{ marginBottom: 0 }}>
            {recentStocks[1].toFixed(2)}
          </h2>
          <div>
            <h3
              style={{
                marginTop: 0,
                color: `${
                  this.getChange(recentStocks) > 0 ? "#26D500" : "#E10000"
                }`,
              }}
            >
              {this.getChange(recentStocks)} (
              {this.getPercentageChange(recentStocks)}%){" "}
              <i
                className={`${
                  this.getChange(recentStocks) > 0 ? "green up" : "red down"
                } arrow alternate circle icon`}
                style={{ display: "inline-block", fontSize: "1em" }}
              ></i>
            </h3>
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

export default connect(mapStateToProps)(ChartHeader);

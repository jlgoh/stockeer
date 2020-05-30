import React from "react";
import { connect } from "react-redux";
import ChartWrapper from "./charts/ChartWrapper";
import Loading from "./Loading";
import { fetchStock } from "../actions";

class WatchItem extends React.Component {
  state = { expanded: false };

  componentDidMount() {
    if (!(`${this.props.term}_DAILY` in this.props.stocks))
      this.props.fetchStock("DAILY", this.props.term);
  }

  getRecentStocks() {
    //Array containing closing prices for last 2 days
    const { stocks, term } = this.props;
    return stocks[`${term}_DAILY`].slice(-2).map((stock) => stock.close);
  }

  getChange(recentStocks) {
    return (recentStocks[1] - recentStocks[0]).toFixed(2);
  }

  getPercentageChange(recentStocks) {
    return ((this.getChange(recentStocks) / recentStocks[0]) * 100).toFixed(2);
  }

  renderChart() {
    if (this.state.expanded) return <ChartWrapper term={this.props.term} />;
  }

  render() {
    const { term, stocks } = this.props;
    if (!(`${term}_DAILY` in stocks)) {
      return <Loading />;
    }

    const recentStocks = this.getRecentStocks();
    const percentageChange = this.getPercentageChange(recentStocks);
    return (
      <div
        className="item"
        style={{ cursor: "pointer" }}
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        <h3
          style={{ margin: "0.6rem 1em 0 0" }}
          className="left floated content"
        >
          {term}
        </h3>
        <div className="right floated content">
          <div
            className="left floated content"
            style={{ display: "inline", marginTop: "10px" }}
          >
            <h4>{recentStocks[1].toFixed(2)}</h4>
          </div>
          <div
            style={{ maxWidth: "85px" }}
            className={`${percentageChange >= 0 ? "green" : "red"} ui button`}
          >
            {percentageChange >= 0 ? "+" : ""}
            {percentageChange}%
          </div>
          <i
            className={`${
              this.state.expanded ? "vertically flipped" : ""
            } dropdown icon`}
          />
        </div>
        <div style={{ marginTop: "30px" }} onClick={(e) => e.stopPropagation()}>
          {this.renderChart()}
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

export default connect(mapStateToProps, { fetchStock })(WatchItem);

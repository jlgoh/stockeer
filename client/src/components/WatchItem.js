import React from "react";
import { connect } from "react-redux";
import requireStocksData from "./requireStocksData";
import ChartWrapper from "./charts/ChartWrapper";
import Loading from "./Loading";
import { fetchStock } from "../actions";

class WatchItem extends React.Component {
  state = { expanded: false };

  componentDidMount() {
    if (!(`${this.props.term}_DAILY` in this.props.stocks))
      this.props.fetchStock("DAILY", this.props.term);
  }

  renderChart() {
    if (this.state.expanded) return <ChartWrapper term={this.props.term} />;
  }

  render() {
    const { term, name, stocks } = this.props;
    if (!(`${term}_DAILY` in stocks)) {
      return <Loading />;
    }

    const recentStocks = this.props.getRecentStocks();
    const percentageChange = this.props.getPercentageChange(recentStocks);
    return (
      <div
        className="item"
        style={{ cursor: "pointer" }}
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        <div style={{ maxWidth: "30%" }} className="left floated content">
          <h3 style={{ display: "inline" }}>{term}</h3>
          <div>{name}</div>
        </div>

        <div className="right floated content">
          <div
            className="left floated content"
            style={{ display: "inline", marginTop: "10px" }}
          >
            <h4>
              {recentStocks[1] < 10
                ? recentStocks[1].toFixed(4)
                : recentStocks[1].toFixed(2)}
            </h4>
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

export default connect(mapStateToProps, { fetchStock })(
  requireStocksData(WatchItem)
);

import React from "react";

export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    getRecentStocks(props) {
      //Array containing closing prices for last 2 days
      const { stocks, term } = props;
      return stocks[`${term}_DAILY`].slice(-2).map((stock) => stock.close);
    }

    getChange(recentStocks) {
      const change = recentStocks[1] - recentStocks[0];
      return recentStocks[1] < 10 ? change.toFixed(4) : change.toFixed(2);
    }

    getPercentageChange(recentStocks) {
      return ((this.getChange(recentStocks) / recentStocks[0]) * 100).toFixed(
        2
      );
    }

    render() {
      const newProps = {
        getRecentStocks: () => this.getRecentStocks(this.props),
        getChange: this.getChange,
        getPercentageChange: this.getPercentageChange,
      };

      return <ChildComponent {...this.props} {...newProps} />;
    }
  }

  return ComposedComponent;
};

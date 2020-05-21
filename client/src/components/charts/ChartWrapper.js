import React from "react";
import Chart from "./Chart";
import { fetchStock } from "../../actions";
import { connect } from "react-redux";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchStock("DAILY", this.props.search);
  }
  render() {
    //If object store is empty (Loading)
    if (Object.keys(this.props.stocks).length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className="ui segment">
        <h3 className="ui center aligned header">{this.props.search}</h3>
        <TypeChooser>
          {(type) => (
            <Chart
              type={type}
              data={this.props.stocks[`${this.props.search}_DAILY`]}
            />
          )}
        </TypeChooser>
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

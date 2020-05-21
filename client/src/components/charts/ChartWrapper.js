import React from "react";
import Chart from "./Chart";
import { getData } from "./utils";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartWrapper extends React.Component {
  async componentDidMount() {
    const response = await getData("intra", "GOOG");
    this.setState({ data: response });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div className="ui segment">
        <h3 className="ui center aligned header">GOOG</h3>
        <TypeChooser>
          {(type) => <Chart type={type} data={this.state.data} />}
        </TypeChooser>
      </div>
    );
  }
}

export default ChartWrapper;

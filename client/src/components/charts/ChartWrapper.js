import React from "react";
import Chart from "./Chart";
import Loading from "../Loading";
import { fetchStock } from "../../actions";
import { connect } from "react-redux";

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchStock("DAILY", this.props.term);
  }

  componentDidUpdate(prevProps) {
    //Fetch stock only if search term has changed AND if stock is not in store
    if (
      prevProps.term !== this.props.term &&
      !(`${this.props.term}_DAILY` in this.props.stocks)
    ) {
      this.props.fetchStock("DAILY", this.props.term);
    }
  }

  render() {
    //If object store is empty (Loading) or stock is not in store (Subsequent queries)
    if (!(`${this.props.term}_DAILY` in this.props.stocks)) {
      return <Loading />;
    }
    return (
      <div className="ui segment">
        <h3 className="ui center aligned header">{this.props.term}</h3>
        <TypeChooser>
          {(type) => (
            <Chart
              type={type}
              data={this.props.stocks[`${this.props.term}_DAILY`]}
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

import React from "react";
import ChartWrapper from "./ChartWrapper";
import SearchBar from "./SearchBar";

class SearchPage extends React.Component {
  state = { term: "" };

  onTermSubmit = (term) => {
    this.setState({ term });
  };

  renderChart() {
    if (this.state.term) {
      return <ChartWrapper term={this.state.term} />;
    }
  }

  render() {
    return (
      <div>
        <SearchBar onTermSubmit={this.onTermSubmit} />
        {this.renderChart()}
      </div>
    );
  }
}
export default SearchPage;

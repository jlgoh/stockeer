import React from "react";
import ChartWrapper from "./charts/ChartWrapper";
import SearchBar from "./SearchBar";
import history from "../history";
import * as qs from "query-string";

class SearchPage extends React.Component {
  state = { term: "" };

  onTermSubmit = (term) => {
    this.setState({ term });
    history.push(`?q=${term}`);
  };

  renderChart() {
    //Render chart either by term earch or direct URL navigation

    if (this.state.term || this.props.location.search) {
      return (
        <ChartWrapper
          term={
            this.state.term ||
            qs.parse(this.props.location.search).q.toUpperCase()
          }
        />
      );
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

import React from "react";
import { Search, Grid } from "semantic-ui-react";
import marketstack from "../api/marketstack";
import _ from "lodash";
import { connect } from "react-redux";
import { storeSearchResults } from "../actions";

const initialState = { term: "", isLoading: false, results: [] };

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleInputChange = _.debounce(async (value) => {
      const res = await marketstack.get(`/marketstack?term=${value}`);
      const duplicateCheck = {};
      this.setState({
        isLoading: false,
        results: res.data.data
          .map((stock) => {
            if (duplicateCheck[stock.symbol]) return null; // Do not add duplicate symbols to the search suggestions.

            duplicateCheck[stock.symbol] = stock.name;
            return {
              title: stock.symbol,
              description: stock.name,
            };
          })
          .filter((obj) => obj !== null),
      });
      this.props.storeSearchResults(this.state.results);
      return res;
    }, 200);
  }

  onInputChange = (event) => {
    if (event.target.value.length < 1) return this.setState(initialState);
    this.setState({ term: event.target.value, isLoading: true });

    try {
      this.handleInputChange(event.target.value);
    } catch (err) {
      console.log(err);
    }
  };

  handleResultSelect = (event, { result }) => {
    this.setState({ term: result.title });
    this.props.onTermSubmit(result.title.toUpperCase());
  };

  onTermSubmit = (event) => {
    event.preventDefault();
    this.props.onTermSubmit(this.state.term.toUpperCase());
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <form
          onSubmit={this.onTermSubmit}
          className="ui fluid center category search"
        >
          <Grid>
            <Grid.Column width={2} />
            <Grid.Column width={12}>
              <Search
                input={{
                  fluid: true,
                  placeholder: "Enter a ticker symbol",
                }}
                loading={this.state.isLoading}
                value={this.state.term}
                results={this.state.results}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.onInputChange}
              />
            </Grid.Column>
            <Grid.Column width={2} />
          </Grid>
        </form>
      </div>
    );
  }
}

export default connect(null, { storeSearchResults })(SearchBar);

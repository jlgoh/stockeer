import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  componentDidUpdate() {}

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onTermSubmit = (event) => {
    event.preventDefault();
    this.props.onTermSubmit(this.state.term.toUpperCase());
  };

  render() {
    return (
      <div className="ui container">
        <form
          onSubmit={this.onTermSubmit}
          className="ui fluid center category search"
        >
          <div className="ui fluid icon input">
            <input
              className="fluid prompt"
              type="text"
              placeholder="Search"
              value={this.state.term}
              onChange={this.onInputChange}
            ></input>
            <i className="search icon"></i>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

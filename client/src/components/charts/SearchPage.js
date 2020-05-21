import React from "react";
import ChartWrapper from "./ChartWrapper";

class SearchPage extends React.Component {
  render() {
    return (
      <div>
        <ChartWrapper search={"GOOG"} />
      </div>
    );
  }
}
export default SearchPage;

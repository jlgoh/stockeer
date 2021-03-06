import React from "react";
import { connect } from "react-redux";
import { addBookmark, deleteBookmark, updateBookmark } from "../../actions";
import requrieStocksData from "../requireStocksData";
import { Form, TextArea, Confirm } from "semantic-ui-react";

class ChartHeader extends React.Component {
  state = {
    noteInput: false,
    note: this.props.bookmarks[this.props.term]
      ? this.props.bookmarks[this.props.term].note
      : "",
    updateConfirm: false,
    removeWarning: false,
  };

  renderWarning = () => this.setState({ removeWarning: true });
  handleConfirm = () => {
    const { term, bookmarks } = this.props;
    this.props.deleteBookmark(term, bookmarks[term]._id);
    this.setState({ removeWarning: false });
  };
  handleCancel = () => this.setState({ removeWarning: false });

  confirmUpdate = async () => {
    const { term, bookmarks } = this.props;
    const res = await this.props.updateBookmark(
      term,
      bookmarks[term]._id,
      this.state.note
    );
    if (res.status === 200) this.setState({ updateConfirm: true });
  };

  renderSuccessUpdate() {
    if (this.state.updateConfirm) {
      return (
        <i
          className="green check circle icon"
          style={{
            display: "inline-block",
            fontSize: "1em",
          }}
        />
      );
    }
  }

  renderInput() {
    if (this.state.noteInput) {
      return (
        <div>
          <Form
            inverted
            className="ui center aligned"
            onSubmit={this.confirmUpdate}
          >
            <TextArea
              style={{
                whiteSpace: "pre",
                maxWidth: "500px",
                minHeight: "150px",
                marginTop: "10px",
              }}
              placeholder="Enter your notes here"
              value={this.state.note}
              onChange={(event) => this.setState({ note: event.target.value })}
            />
            <div>
              <div>
                Last Updated:{" "}
                {this.props.bookmarks[this.props.term].lastUpdated}{" "}
                {this.renderSuccessUpdate()}
              </div>
              <button
                type="submit"
                className="ui center aligned secondary button"
                style={{ margin: "10px auto 0" }}
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      );
    }
  }

  renderButtons() {
    const { term, bookmarks } = this.props;
    if (term in bookmarks) {
      return (
        <div>
          <div>
            <i
              className="bookmark icon"
              style={{
                display: "inline-block",
                fontSize: "1.5em",
                cursor: "pointer",
              }}
              title="Remove from Watchlist"
              onClick={this.renderWarning}
            />
            &ensp;
            <i
              className={
                this.state.noteInput ? `edit icon` : `pencil alternate icon`
              }
              style={{
                display: "inline-block",
                fontSize: "1.5em",
                cursor: "pointer",
              }}
              title={this.state.noteInput ? "Collapse" : "Add Notes"}
              onClick={() =>
                this.setState({ noteInput: !this.state.noteInput })
              }
            />
          </div>
          <div>{this.renderInput()}</div>
          <Confirm
            open={this.state.removeWarning}
            header={`This will remove ${this.props.term} from your watchlist`}
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        </div>
      );
    }

    return (
      <div>
        <i
          className="outline bookmark icon"
          style={{
            display: "inline-block",
            fontSize: "1.5em",
            cursor: "pointer",
          }}
          title="Add to Watchlist"
          onClick={() =>
            this.props.addBookmark(
              this.props.term,
              this.props.search[this.props.term]
            )
          }
        />{" "}
      </div>
    );
  }

  render() {
    const recentStocks = this.props.getRecentStocks();
    return (
      <div
        className="ui center aligned dividing icon header"
        style={{ padding: "0.5rem", cursor: "default" }}
      >
        <div className="sub header">
          {this.props.term}
          <h2 className="ui huge header" style={{ marginBottom: 0 }}>
            {recentStocks[1] < 10
              ? recentStocks[1].toFixed(4)
              : recentStocks[1].toFixed(2)}
          </h2>
          <div>
            <h3
              style={{
                marginTop: 0,
                color: `${
                  this.props.getChange(recentStocks) >= 0
                    ? "#26D500"
                    : "#E10000"
                }`,
              }}
            >
              {this.props.getChange(recentStocks)} (
              {this.props.getPercentageChange(recentStocks)}%){" "}
              <i
                className={`${
                  this.props.getChange(recentStocks) >= 0
                    ? "green up"
                    : "red down"
                } arrow alternate circle icon`}
                style={{ display: "inline-block", fontSize: "1em" }}
              ></i>
            </h3>
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    bookmarks: state.bookmarks,
    search: state.search,
  };
};

export default connect(mapStateToProps, {
  addBookmark,
  deleteBookmark,
  updateBookmark,
})(requrieStocksData(ChartHeader));

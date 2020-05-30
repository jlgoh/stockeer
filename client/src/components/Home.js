import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Segment,
  Header,
  Container,
  Button,
  Icon,
  Grid,
  Image,
} from "semantic-ui-react";

class Home extends React.Component {
  renderButtons() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Link to="/login">
            <Button primary size="huge">
              Get Started
              <Icon name="right arrow" />
            </Button>
          </Link>
        );
      default:
        return (
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={5}>
                <Link to="/search">
                  <Button primary size="huge" style={{ minWidth: "184px" }}>
                    &ensp;Search&ensp;
                    <Icon name="search" />
                  </Button>
                </Link>
              </Grid.Column>
              <Grid.Column width={5}>
                <Link to="/watchlist">
                  <Button primary size="huge" style={{ maxHeight: "51px" }}>
                    Watchlist&ensp;
                    <Icon name="bookmark" />
                  </Button>
                </Link>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
          </Grid>
        );
    }
  }

  renderPreview() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Get Accurate Real-Time Stock Quotes
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    We provide real-time data from international stock markets
                    including NYSE, NASDAQ, SGX and many more
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image bordered rounded size="huge" src="preview.svg" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Link to="/login">
                    <Button size="huge">Check It Out</Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        );
      default:
        return;
    }
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: "600px", padding: "1em 0em" }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content="Stockeer"
              inverted
              style={{
                fontSize: "4em",
                marginTop: "2em",
                fontWeight: "normal",
                marginBottom: 0,
              }}
            />
            <Header
              as="h2"
              content="Stay up-to-date with the latest stock market trends"
              inverted
              style={{
                fontSize: "1.5em",
                fontWeight: "normal",
                marginTop: "0.5em",
              }}
            />
            {this.renderButtons()}
          </Container>
        </Segment>
        {this.renderPreview()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);

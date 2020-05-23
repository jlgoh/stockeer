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

  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: "600px", padding: "1em 0em" }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content="Stocky"
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
              content="Think different"
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
        <Segment vertical></Segment>
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

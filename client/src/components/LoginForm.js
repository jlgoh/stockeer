import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from "../actions";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider,
  Icon,
} from "semantic-ui-react";

const formFields = [
  { label: "Username", name: "username", type: "text", icon: "user" },
  { label: "Password", name: "password", type: "password", icon: "lock" },
];

class LoginForm extends React.Component {
  state = { username: "", password: "", error: "" };

  componentDidMount() {
    document.title = "Login";
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const res = await this.props.logIn(this.state);
    if (res.status === 401) {
      this.setState({ error: "Username or Password is incorrect" });
    }
  };

  renderError(message) {
    if (message) {
      return <div className="ui red message">{message}</div>;
    }
  }

  renderFields() {
    return formFields.map(({ label, name, type, icon }) => {
      return (
        <div key={name} className="field">
          <Form.Input
            fluid
            icon={icon}
            iconPosition="left"
            required
            type={type}
            name={name}
            placeholder={label}
            value={this.state[name]}
            onChange={this.onInputChange}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.props.location.state
            ? this.renderError(this.props.location.state.referrer)
            : null}
          <Header as="h2" textAlign="center">
            Login to your account
          </Header>
          <a href="/auth/google">
            <Button
              basic
              fluid
              size="large"
              type="submit"
              style={{ marginBottom: "5px" }}
            >
              <Icon name="google" />
              Continue with Google
            </Button>
          </a>
          <Divider horizontal>Or</Divider>
          <Form size="large" onSubmit={this.onFormSubmit}>
            <Segment stacked>
              {this.renderError(this.state.error)}
              {this.renderFields()}
              <Button primary fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { logIn })(LoginForm);

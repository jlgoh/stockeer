import React from "react";
import { Link } from "react-router-dom";
import { logIn } from "../actions";

const formFields = [
  { label: "Username", name: "username", type: "text" },
  { label: "Password", name: "password", type: "password" },
];

class LoginForm extends React.Component {
  state = { username: "", password: "", error: "" };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const res = await logIn(this.state);
    console.log(res);
    if (res.status === 401) {
      this.setState({ error: "Username or Password is incorrect" });
    }
  };

  renderError() {
    if (this.state.error) {
      return <div className="ui red message">{this.state.error}</div>;
    }
  }

  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return (
        <div key={name} className="field">
          <label>{label}</label>
          <input
            required
            type={type}
            name={name}
            placeholder={label}
            value={this.state[name]}
            onChange={this.onInputChange}
          ></input>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          {this.renderError()}
          {this.renderFields()}
          <button type="submit" className="ui inverted primary button">
            Log In
          </button>
        </form>
        <Link to="/signup">
          If you do not have an account click here to sign up
        </Link>
      </div>
    );
  }
}

export default LoginForm;

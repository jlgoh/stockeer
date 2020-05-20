import React from "react";
import { signUp } from "../actions";

const formFields = [
  { label: "Username", name: "username", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
];

class SignupForm extends React.Component {
  state = { username: "", email: "", password: "", error: "" };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const res = await signUp(this.state);
    if (res.status === 401) {
      this.setState({ error: res.data });
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
      <form className="ui form" onSubmit={this.onFormSubmit}>
        {this.renderError()}
        {this.renderFields()}
        <button type="submit" className="ui inverted primary button">
          Sign Up
        </button>
      </form>
    );
  }
}

export default SignupForm;

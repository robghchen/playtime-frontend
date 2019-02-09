import React, { Component } from "react";
import { Route } from "react-router-dom";

class LoginForm extends Component {
  state = {
    loginUsername: "",
    loginPassword: "",
    alert_error: false
  };

  componentWillUnmount() {
    localStorage.removeItem("loginError");
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitLoginHandler = event => {
    event.preventDefault();

    if (this.state.loginUsername !== "" && this.state.loginPassword !== "") {
      this.props.submitLoginHandler(this.state, event);
      this.setState({
        loginUsername: "",
        loginPassword: ""
      });
    } else {
      this.setState({ alert_error: true });
    }
  };

  render() {
    return (
      <div id="login-form" className="ui card form">
        <h2>Login</h2>
        <Route
          path="/login"
          render={() => {
            return (
              <div>
                <form onSubmit={this.submitLoginHandler}>
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    className="form-control"
                    name="loginUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={this.state.loginUsername}
                    onChange={this.changeHandler}
                  />
                  <br />
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    className="form-control"
                    name="loginPassword"
                    type="password"
                    placeholder="Enter a password"
                    value={this.state.loginPassword}
                    onChange={this.changeHandler}
                  />

                  {this.state.alert_error ? (
                    <span className="alert-error">
                      Username and password field cannot be empty.
                    </span>
                  ) : null}
                  <span className="alert-error">
                    {localStorage.getItem("loginError") !== ""
                      ? localStorage.getItem("loginError")
                      : null}
                  </span>
                  <input
                    type="submit"
                    className="login button pointer"
                    value="Submit"
                  />
                </form>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default LoginForm;

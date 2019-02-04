import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EditProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.currentUser.id,
      full_name: this.props.currentUser.full_name,
      password: "",
      mod_id: this.props.currentUser.mod_id,
      alert_error: false
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  render() {
    return (
      <div id="edit-profile-form" className="ui card form">
        {this.props.isUserLoggedIn ? (
          <form onSubmit={this.submitHandler}>
            <label htmlFor="full_name">Full Name: </label>
            <input
              type="text"
              name="full_name"
              onChange={this.changeHandler}
              value={this.state.full_name}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="type new password"
              id="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <label htmlFor="mod">Mod #: </label>
            <select
              name="mod_id"
              id="mod_id"
              onChange={this.changeHandler}
              value={this.state.mod_id}
            >
              {this.getMods()}
            </select>

            {this.state.alert_error ? <span className="alert-error">Full name and password field cannot be empty. Mod ID should not be lower than your current mod.</span> : null}

            <input
              type="submit"
              className="submit button pointer"
              value="Update"
            />
          </form>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }

  getMods() {
    return this.props.mods.map(mod => (
      <option key={mod.id} value={mod.id}>
        {mod.rank}
      </option>
    ));
  }

  submitHandler(e) {
    e.preventDefault();
    if (
      this.state.full_name !== "" &&
      this.state.password !== "" &&
      this.state.mod_id >= this.props.currentUser.mod_id
    ) {
      this.props.updateHandler(this.state);
      e.target.reset();
    } else {
      this.setState({ alert_error: true });
    }
  }

  changeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
}

export default EditProfileForm;

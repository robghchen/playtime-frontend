import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EditProfileForm extends Component {
  state = {
    id: this.props.currentUser.id,
    username: this.props.currentUser.username,
    password: "",
    first_name: this.props.currentUser.first_name,
    last_name: this.props.currentUser.last_name,
    email: this.props.currentUser.email,
    city: this.props.currentUser.city,
    school: this.props.currentUser.school,
    work: this.props.currentUser.work,
    profile_img: this.props.currentUser.profile_img,
    cover_img: this.props.currentUser.cover_img,
    alert_error: false
  };

  render() {
    return (
      <div id="edit-profile-form" className="ui card form">
        {this.props.isUserLoggedIn ? (
          <form onSubmit={this.submitHandler} className="edit-profile-form">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={this.changeHandler}
              value={this.state.username}
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="type your password"
              id="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <label htmlFor="first_name">First Name: </label>
            <input
              type="text"
              name="first_name"
              onChange={this.changeHandler}
              value={this.state.first_name}
            />
            <label htmlFor="last_name">Last Name: </label>
            <input
              type="text"
              name="last_name"
              onChange={this.changeHandler}
              value={this.state.last_name}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              onChange={this.changeHandler}
              value={this.state.email}
            />
            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="city"
              onChange={this.changeHandler}
              value={this.state.city}
            />
            <label htmlFor="school">School: </label>
            <input
              type="text"
              name="school"
              onChange={this.changeHandler}
              value={this.state.school}
            />
            <label htmlFor="work">Work: </label>
            <input
              type="text"
              name="work"
              onChange={this.changeHandler}
              value={this.state.work}
            />
            <label htmlFor="profile_img">Profile Image: </label>
            <input
              type="text"
              name="profile_img"
              onChange={this.changeHandler}
              value={this.state.profile_img}
            />
            <label htmlFor="cover_img">Cover Image: </label>
            <input
              type="text"
              name="cover_img"
              onChange={this.changeHandler}
              value={this.state.cover_img}
            />

            {this.state.alert_error ? (
              <span className="alert-error">
                Username and password field cannot be empty.
              </span>
            ) : null}
            <br className="big-br"/>
            <input
              type="submit"
              className="submit button pointer update"
              value="Update"
            />
          </form>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }

  submitHandler = e => {
    e.preventDefault();
    if (this.state.username !== "" && this.state.password !== "") {
      this.props.updateHandler(this.state);
      e.target.reset();
    } else {
      this.setState({ alert_error: true });
    }
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
}

export default EditProfileForm;

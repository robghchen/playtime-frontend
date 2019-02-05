import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class UserCard extends Component {
  state = {};
  render() {
    return <p className="username"><Link to={`/user/${this.props.user.id}`}>{this.props.user.username}</Link></p>;
  }
}

export default withRouter(UserCard);

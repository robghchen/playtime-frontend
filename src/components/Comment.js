import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return (
    <React.Fragment>
      <p className="username"><Link to={`/user/${this.props.comment.user.id}`}>{this.props.comment.user.username}</Link></p><br/><p>{this.props.comment.comment}</p>
      </React.Fragment>)
  }
}

export default withRouter(Comment);

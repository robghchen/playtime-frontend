import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return (
    <React.Fragment>
      <p className="username">{this.props.comment.user.username} </p><br/><p>{this.props.comment.comment}</p>
      </React.Fragment>)
  }
}

export default withRouter(Comment);

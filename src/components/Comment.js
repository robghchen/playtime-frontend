import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return <p>{this.props.comment.comment}</p>;
  }
}

export default withRouter(Comment);

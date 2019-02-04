import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    console.log(this.props);
    return <p>{this.props.comment.comment}</p>;
  }
}

export default withRouter(Comment);

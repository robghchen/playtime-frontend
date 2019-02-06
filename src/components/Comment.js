import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return (
    <React.Fragment>
      <span><img
                    src={
                      this.props.comment.user.profile_img
                    }
                    alt={
                      this.props.comment.user.username
                    }
                    className="profile-icon"
                  /></span>
      <div className="comment">
      <p className="username"><Link to={`/user/${this.props.comment.user.id}`}>{this.props.comment.user.username}</Link></p><br/><p>{this.props.comment.comment}</p></div>
      </React.Fragment>)
  }
}

export default withRouter(Comment);

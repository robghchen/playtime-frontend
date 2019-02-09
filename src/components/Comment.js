import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Link to={`/user/${this.props.comment.user.id}`}>
          <span>
            <img
              src={this.props.comment.user.profile_img}
              alt={this.props.comment.user.username}
              className="profile-icon"
            />
          </span>
        </Link>
        <div className="comment">
          <p className="username">
            <span>Lvl {this.props.comment.user.lvl} </span>
            <Link to={`/user/${this.props.comment.user.id}`}>
              {this.props.comment.user.username}
            </Link>
            <span className="date">
              {" "}
              {this.props.comment.created_at.slice(5, 7)}/
              {this.props.comment.created_at.slice(8, 10)}/
              {this.props.comment.created_at.slice(2, 4)}
            </span>
          </p>
          <br />
          <p>{this.props.comment.comment}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Comment);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Comment from "../components/Comment";

class CommentsContainer extends Component {
  render() {
    return (
      <div>
        {this.props.comments
          .reverse()
          .filter(comment => {
            return comment.post_id === this.props.post.id;
          })
          .map(comment => {
            return (
              <div key={comment.id} className="">
                <Comment
                  comment={comment}
                  currentUser={this.props.currentUser}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(CommentsContainer);

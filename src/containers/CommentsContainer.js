import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Comment from "../components/Comment";
import NewCommentForm from "../components/NewCommentForm";

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

        <NewCommentForm
          currentUser={this.props.currentUser}
          addComment={this.props.addComment}
          post={this.props.post}
        />
      </div>
    );
  }
}

export default withRouter(CommentsContainer);

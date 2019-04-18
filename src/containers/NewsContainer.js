import React, { Component } from "react";
import Post from "../components/Post";
import { withRouter } from "react-router-dom";

class NewsContainer extends Component {
  state = {
    user_id: this.props.user_id
  };

  showPostArray = () => {
    let posts = this.props.posts
      // .filter(post => {
      //   return (
      //     post.player_id !== this.props.currentUser.id &&
      //     post.friend_id !== this.props.currentUser.id
      //   );
      // })
      .reverse();

    return (
      <div className="posts-container">
        {posts.map(post => {
          return (
            <div key={post.id} className="content-wrapper">
              <Post
                post={post}
                addComment={this.props.addComment}
                currentUser={this.props.currentUser}
                deleteHandler={this.props.deleteHandler}
                editPostHandler={this.props.editPostHandler}
                isUserLoggedIn={this.props.isUserLoggedIn}
                users={this.props.users}
                comments={this.props.comments}
                hideEditCoverAndProfilePic={
                  this.props.hideEditCoverAndProfilePic
                }
              />
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="main-column">
        {this.showPostArray()}
      </div>
    );
  }
}

export default withRouter(NewsContainer);

import React, { Component } from "react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";
import { withRouter } from "react-router-dom";

class PostsContainer extends Component {
  state = {
    user_id: this.props.user_id
  };

  showPostArray = () => {
    let posts = this.props.posts
      .filter(post => {
        return post.friend_id === parseInt(this.props.user_id);
      })
      .reverse();

    return (
      <div className="post-array-container">
        {posts.map(post => {
          return (
            <div key={post.id} className="content-wrapper">
              <Post
                post={post}
                addComment={this.props.addComment}
                currentUser={this.props.currentUser}
                deleteHandler={this.props.deleteHandler}
                editPostHandler={this.props.editPostHandler}
                // likes={this.props.likes}
                isUserLoggedIn={this.props.isUserLoggedIn}
                users={this.props.users}
                comments={this.props.comments}
              />
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const show = { display: this.props.isUserLoggedIn ? "block" : "none" };
    return (
      <div className="ui">
        <div className="post-container">{this.showPostArray()}</div>
        <div style={show}>
          <NewPostForm
            addPost={this.props.addPost}
            user_id={this.props.user_id}
            currentUser={this.props.currentUser}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PostsContainer);

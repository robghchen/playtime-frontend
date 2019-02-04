import React, { Component } from "react";
import PostIt from "./PostIt";
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
              <PostIt
                post={post}
                currentUser={this.props.currentUser}
                deleteHandler={this.props.deleteHandler}
                editPostHandler={this.props.editPostHandler}
                // likes={this.props.likes}
                isUserLoggedIn={this.props.isUserLoggedIn}
                users={this.props.users}
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
            mod_id={this.props.mod_id}
            currentUser={this.props.currentUser}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PostsContainer);

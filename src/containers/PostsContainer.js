import React, { Component } from "react";
import Post from "../components/Post";
import NewPostForm from "../components/NewPostForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import { PropTypes } from "prop-types"

class PostsContainer extends Component {
  state = {
    user_id: this.props.user_id
  };

  showPostArray = () => {
    let posts = this.props.posts
      .filter(post => {
        return this.props.location.pathname === "/profile"
          ? post.friend_id === this.props.currentUser.id
          : post.friend_id === parseInt(this.props.user_id);
      })
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
                // likes={this.props.likes}
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
    const show = { display: this.props.isUserLoggedIn ? "block" : "none" };
    return (
      <div className="main-column">
        <div style={show}>
          <NewPostForm
            addPost={this.props.addPost}
            users={this.props.users}
            user_id={this.props.user_id}
            currentUser={this.props.currentUser}
          />
        </div>
        <div className="post-container">{this.showPostArray()}</div>
      </div>
    );
  }
}

PostsContainer.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchPosts }
  )(PostsContainer)
);

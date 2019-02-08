import React, { Component } from "react";
import Post from "../components/Post";
import NewPostForm from "../components/NewPostForm";
import { withRouter } from "react-router-dom";
import EditCover from "../components/EditCover";
import EditProfilePic from "../components/EditProfilePic";

class PostsContainer extends Component {
  state = {
    user_id: this.props.user_id,
    showEditCover: false,
    showEditProfilePic: false
  };

  editCover = () => {
    this.props.editCover();
    this.setState({ showEditCover: false });
  };

  editProfilePic = () => {
    this.props.editProfilePic();
    this.setState({ showEditProfilePic: false });
  };

  hideEditCoverAndProfilePic = () => {
    this.setState({ showEditCover: false, showEditProfilePic: false });
  };

  showPostArray = () => {
    let posts = this.props.posts
      .filter(post => {
        return this.props.location.pathname === "/home"
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
                hideEditCoverAndProfilePic={this.hideEditCoverAndProfilePic}
              />
            </div>
          );
        })}
      </div>
    );
  };

  toggleEditCover = () => {
    this.setState({ showEditCover: !this.state.showEditCover });
  };

  toggleEditProfilePic = () => {
    this.setState({ showEditProfilePic: !this.state.showEditProfilePic });
  };

  render() {
    const show = { display: this.props.isUserLoggedIn ? "block" : "none" };
    return (
      <div className="ui">
        <div className="banner">
          <img
            src={
              this.props.users.find(user => user.id === this.props.user_id)
                .cover_img
            }
            alt="cover photo"
            className={
              this.props.user_id === this.props.currentUser.id
                ? "cover-photo pointer"
                : "cover-photo"
            }
            onClick={
              this.props.user_id === this.props.currentUser.id
                ? this.toggleEditCover
                : null
            }
          />
          {this.state.showEditCover ? (
            <EditCover editCover={this.editCover} />
          ) : null}
          <img
            src={
              this.props.users.find(user => user.id === this.props.user_id)
                .profile_img
            }
            alt="profile pic"
            className={
              this.props.user_id === this.props.currentUser.id
                ? "profile-picture pointer"
                : "profile-picture"
            }
            onClick={
              this.props.user_id === this.props.currentUser.id
                ? this.toggleEditProfilePic
                : null
            }
          />
          {this.state.showEditProfilePic ? (
            <EditProfilePic editProfilePic={this.editProfilePic} />
          ) : null}
          <h2 className="profile-username">
          <span>
              Lvl{" "}
              {
                this.props.users.find(user => user.id === this.props.user_id)
                  .lvl
              }{" "}
            </span>
            <span>{
              this.props.users.find(user => user.id === this.props.user_id)
                .username
            }</span>
            
          </h2>
        </div>

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

export default withRouter(PostsContainer);

import React from "react";
import EditPostForm from "./EditPostForm";
import { withRouter, Link } from "react-router-dom";
import CommentsContainer from "../containers/CommentsContainer";

class Post extends React.Component {
  state = {
    markedForDeletion: false,
    author: ""
  };

  componentDidMount() {
    // fetch("https://welcome-board-backend.herokuapp.com/api/v1/likes")
    //   .then(resp => resp.json())
    //   .then(likes => {
    //     const postLikes = likes.filter(
    //       like => like.post_id === this.props.post.id
    //     ).length;
    //     this.setState({ likes: postLikes });
    //   });
    // const author = this.props.users.find(
    //   user => user.id === this.props.post.player_id
    // ).username;
    // this.setState({
    //   author
    // });
  }

  render() {
    return (
      <div className="post-wrapper">
        <div className="post-content">
          {this.props.post.user_id === parseInt(localStorage.getItem("id")) ||
          parseInt(localStorage.getItem("id")) === 10 ? (
            <span
              className="delete pointer"
              onClick={this.deleteHandler.bind(this)}
            >
              x
            </span>
          ) : null}

          {this.props.post.user_id === parseInt(localStorage.getItem("id")) ? (
            <EditPostForm
              post={this.props.post}
              editPostHandler={this.props.editPostHandler}
              author={this.state.author}
            />
          ) : (
            <React.Fragment>
              <Link
                to={`/user/${
                  this.props.users.find(
                    user => user.id === this.props.post.player_id
                  ).id
                }`}
              >
                <span onClick={this.props.hideEditCover}>
                  <img
                    src={
                      this.props.users.find(
                        user => user.id === this.props.post.player_id
                      ).profile_img
                    }
                    alt={
                      this.props.users.find(
                        user => user.id === this.props.post.player_id
                      ).username
                    }
                    className="profile-icon"
                  />
                </span>
              </Link>
              <div className="post">
                <p className="username" onClick={this.props.hideEditCoverAndProfilePic}>
                <span>Lvl {this.props.users.find(
                        user => user.id === this.props.post.player_id
                      ).lvl} </span><Link
                    to={`/user/${
                      this.props.users.find(
                        user => user.id === this.props.post.player_id
                      ).id
                    }`}
                  >
                    {
                      this.props.users.find(
                        user => user.id === this.props.post.player_id
                      ).username
                    }{" "}
                  </Link>
                </p>
                <br />
                <p>{this.props.post.content}</p>
              </div>
              <br />
              <CommentsContainer
                comments={this.props.comments}
                post={this.props.post}
                addComment={this.props.addComment}
                currentUser={this.props.currentUser}
                users={this.props.users}
              />
            </React.Fragment>
          )}

          {/* <div className="likes">
            <span>{this.state.likes} </span>
            <span
              role="img"
              aria-label="emoji"
              className={this.props.isUserLoggedIn ? "pointer" : ""}
              onClick={
                this.props.isUserLoggedIn ? this.likesHandler.bind(this) : null
              }
            >
              -
            </span>
          </div> */}
        </div>
      </div>
    );
  }

  // likesHandler() {
  //   fetch("", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       post_id: this.props.post.id,
  //       user_id: this.props.currentUser.id
  //     })
  //   }).then(this.setState({ likes: this.state.likes + 1 }));
  // }

  editPostHandler = e => {
    e.preventDefault();
    this.props.editPostHandler();
  };

  deleteHandler() {
    // this.setState({ markedForDeletion: true });
    fetch(`http://localhost:3000/api/v1/posts/${this.props.post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    this.props.deleteHandler(this.props.post.id);
  }
}

export default withRouter(Post);

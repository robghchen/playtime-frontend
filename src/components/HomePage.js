import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Post from "./Post";
import NewPostForm from "./NewPostForm";

class HomePage extends React.Component {
  render() {
    console.log("homepage", this.props.posts);
    return (
      <React.Fragment>
        <NewPostForm
          addPost={this.props.addPost}
          user_id={this.props.user_id}
          currentUser={this.props.currentUser}
        />
        <div className="">
          {this.props.posts
            .filter(post => {
              return post.friend_id === this.props.currentUser.id;
            })
            .map(post => {
              return (
                <div key={post.id} className="">
                  <Post
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
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);

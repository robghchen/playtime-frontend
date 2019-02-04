import React from "react";
import { Link, withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";

class UserShowPage extends Component {
  state = {};
  render() {
    return (
      <PostsContainer
        user_id={RouterProps.match.params.id}
        posts={this.state.posts}
        addPost={this.addPost}
        addComment={this.addComment}
        isUserLoggedIn={this.state.isUserLoggedIn}
        currentUser={this.state.currentUser}
        deleteHandler={this.deleteHandler}
        editPostHandler={this.editPostHandler}
        comments={this.state.comments}
        users={JSON.parse(localStorage.getItem("users"))}
      />
    );
  }
}

export default withRouter(UserShowPage);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";

class UserShowPage extends Component {
  state = {};
  render() {
    return (
        <PostsContainer
          user_id={this.props.user_id}
          posts={this.props.posts}
          addPost={this.props.addPost}
          addComment={this.props.addComment}
          isUserLoggedIn={this.props.isUserLoggedIn}
          currentUser={this.props.currentUser}
          deleteHandler={this.props.deleteHandler}
          editPostHandler={this.props.editPostHandler}
          comments={this.props.comments}
          users={this.props.users}
        />
    );
  }
}

export default withRouter(UserShowPage);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";

class UserShowPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
            alt="cover photo"
            // {
            //   this.props.users.find(user => user.id === this.user_id).cover_img
            // }
            className="cover-photo"
          />
        </div>
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
      </React.Fragment>
    );
  }
}

export default withRouter(UserShowPage);

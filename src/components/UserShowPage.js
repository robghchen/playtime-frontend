import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";
import ActivitiesContainer from "../containers/ActivitiesContainer";
import Banner from "../components/Banner";

class UserShowPage extends Component {
  state = {
    showEditCover: false,
    showEditProfilePic: false
  };

  hideEditCoverAndProfilePic = () => {
    this.setState({ showEditCover: false, showEditProfilePic: false });
  };

  render() {
    return this.props.currentUser.id > this.props.users.length ? (
      <h3>Loading . . .</h3>
    ) : (
      <React.Fragment>
        <Banner
          users={this.props.users}
          user_id={this.props.user_id}
          currentUser={this.props.currentUser}
        />
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
          editCover={this.props.editCover}
          editProfilePic={this.props.editProfilePic}
        />
        <ActivitiesContainer
          activities={this.props.activities}
          currentUser={this.props.currentUser}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(UserShowPage);

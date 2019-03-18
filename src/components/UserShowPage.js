import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";
import Banner from "../components/Banner";
import SideBar from "../containers/SideBar";

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
          editProfilePic={this.props.editProfilePic}
          editCover={this.props.editCover}
        />
        <div className="column-layout">
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
          <SideBar
            currentUser={this.props.currentUser}
            activities={this.props.activities}
            events={this.props.events}
            tasks={this.props.tasks}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserShowPage);

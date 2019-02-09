import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditCover from "../components/EditCover";
import EditProfilePic from "../components/EditProfilePic";

class Banner extends Component {
  state = {
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

  toggleEditCover = () => {
    this.setState({ showEditCover: !this.state.showEditCover });
  };

  toggleEditProfilePic = () => {
    this.setState({ showEditProfilePic: !this.state.showEditProfilePic });
  };

  render() {
    const { users, user_id, currentUser } = this.props;
    return (
      <div className="banner">
        <img
          src={users.find(user => user.id === user_id).cover_img}
          alt="cover"
          className={
            user_id === currentUser.id ? "cover-photo pointer" : "cover-photo"
          }
          onClick={user_id === currentUser.id ? this.toggleEditCover : null}
        />
        {this.state.showEditCover ? (
          <EditCover editCover={this.editCover} />
        ) : null}
        <img
          src={users.find(user => user.id === user_id).profile_img}
          alt="profile pic"
          className={
            user_id === currentUser.id
              ? "profile-picture pointer"
              : "profile-picture"
          }
          onClick={
            user_id === currentUser.id ? this.toggleEditProfilePic : null
          }
        />
        {this.state.showEditProfilePic ? (
          <EditProfilePic editProfilePic={this.editProfilePic} />
        ) : null}
        <h2 className="profile-username">
          <span>Lvl {users.find(user => user.id === user_id).lvl} </span>
          <span>{users.find(user => user.id === user_id).username}</span>
        </h2>
        <h3 className="name-city">
          {users.find(user => user.id === user_id).first_name}{" "}
          {users.find(user => user.id === user_id).last_name} from{" "}
          {users.find(user => user.id === user_id).city}
        </h3>
        <div className="school-work">
          <h3>
            School: {users.find(user => user.id === user_id).school}
            <br className="big-br" />
            Work: {users.find(user => user.id === user_id).work}
          </h3>
        </div>
      </div>
    );
  }
}

export default withRouter(Banner);

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class UserCard extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Link to={`/user/${this.props.user.id}`}>
          <span>
            <img
              src={this.props.user.profile_img}
              alt={this.props.user.username}
              className="profile-icon"
            />
          </span>
        </Link>
        <div className="usercard">
          <p>
            <Link to={`/user/${this.props.user.id}`}>
              <span onClick={this.props.clearSearch} className="username">
                {this.props.user.username}{" "}
              </span>
            </Link>
            <br />
            {this.props.user.first_name} {this.props.user.last_name}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserCard);

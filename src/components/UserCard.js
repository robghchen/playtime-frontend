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
          <span>
            <div>
              <span className="search-username">
                Lvl {this.props.user.lvl}{" "}
              </span>
              <Link to={`/user/${this.props.user.id}`}>
                <span
                  onClick={this.props.clearSearch}
                  className="search-username"
                >
                  {this.props.user.username}{" "}
                </span>
              </Link><span className="school">School: {this.props.user.school}</span><span className="work">Work: {this.props.user.work}</span>
            </div>
            <span>
              {this.props.user.first_name} {this.props.user.last_name}
            </span>
          </span>
          <span className="city">City: {this.props.user.city}</span>
          
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UserCard);

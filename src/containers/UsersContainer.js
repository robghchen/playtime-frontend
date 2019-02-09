import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserCard from "../components/UserCard";

class UsersContainer extends Component {
  state = {};
  render() {
    return (
      <div className="users-container">
        {this.props.filteredUsers
          .filter(user =>
            user.first_name === null || user.last_name === null
              ? user.username
                  .toLowerCase()
                  .includes(this.props.search.toLowerCase())
              : user.username
                  .toLowerCase()
                  .includes(this.props.search.toLowerCase()) ||
                user.first_name
                  .toLowerCase()
                  .includes(this.props.search.toLowerCase()) ||
                user.last_name
                  .toLowerCase()
                  .includes(this.props.search.toLowerCase())
          )
          .map(user => {
            return (
              <UserCard
                key={user.id}
                user={user}
                clearSearch={this.props.clearSearch}
              />
            );
          })}
      </div>
    );
  }
}

export default withRouter(UsersContainer);

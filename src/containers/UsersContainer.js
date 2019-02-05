import React, { Component } from "react";
import UserCard from "../components/UserCard";

class UsersContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.filteredUsers
          .filter(user =>
            user.username
              .toLowerCase()
              .includes(this.props.search.toLowerCase())
          )
          .map(user => {
            return <UserCard key={user.id} user={user} />;
          })}
      </div>
    );
  }
}

export default UsersContainer;

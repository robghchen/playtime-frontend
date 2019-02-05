import React, { Component } from "react";
import UserCard from "../components/UserCard"

class UsersContainer extends Component {
  state = {};
  render() {
    return <div>{this.props.filteredUsers.map(user => {
      return <UserCard key={user.id} user={user}/>
    })}</div>;
  }
}

export default UsersContainer;

import React, { Component } from "react";
import UsersContainer from "../containers/UsersContainer";

class SearchPage extends Component {
  state = {};
  render() {
    console.log(this.props.filteredUsers);
    return (
      <UsersContainer
        filteredUsers={this.props.filteredUsers}
        search={this.props.search}
      />
    );
  }
}

export default SearchPage;

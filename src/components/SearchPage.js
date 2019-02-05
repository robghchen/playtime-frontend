import React, { Component } from "react";
import UsersContainer from "../containers/UsersContainer";

class SearchPage extends Component {
  render() {
    return (
      <UsersContainer
        filteredUsers={[...this.props.users]}
        search={this.props.search}
      />
    );
  }
}

export default SearchPage;

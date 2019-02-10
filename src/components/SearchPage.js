import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UsersContainer from "../containers/UsersContainer";

class SearchPage extends Component {
  render() {
    return (
      <UsersContainer
        filteredUsers={this.props.filteredUsers}
        search={this.props.search}
        clearSearch={this.props.clearSearch}
      />
    );
  }
}

export default withRouter(SearchPage);

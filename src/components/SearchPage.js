import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UsersContainer from "../containers/UsersContainer";

class SearchPage extends Component {
  render() {
    console.log(this.props.clearSearch);
    return (
      <UsersContainer
        filteredUsers={[...this.props.users]}
        search={this.props.search}
        clearSearch={this.props.clearSearch}
      />
    );
  }
}

export default withRouter(SearchPage);

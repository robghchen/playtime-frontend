import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class UserCard extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <p>
          <Link to={`/user/${this.props.user.id}`}>
            <span onClick={this.props.clearSearch} className="username">
              {this.props.user.username}{" "}
            </span>
          </Link>
          <br />
          {this.props.user.first_name} {this.props.user.last_name}
        </p>
      </React.Fragment>
    );
  }
}

export default withRouter(UserCard);

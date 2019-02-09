import React from "react";
import { withRouter } from "react-router-dom";

class HomePage extends React.Component {
  state = {};
  render() {
    return <p>i'm logged out homepage</p>;
  }
}

export default withRouter(HomePage);

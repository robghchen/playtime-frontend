import React from "react";
import { Link, withRouter } from "react-router-dom";
import PostsContainer from "../containers/PostsContainer";

class HomePage extends React.Component {
  state = {};
  render() {
    return <p>i'm logged out homepage</p>;
  }
}

export default withRouter(HomePage);

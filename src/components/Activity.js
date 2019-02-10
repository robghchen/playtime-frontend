import React, { Component } from "react";

class Activity extends Component {
  state = {};
  render() {
    return <p className="activity">{this.props.activity.task}</p>;
  }
}

export default Activity;

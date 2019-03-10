import React, { Component } from "react";

class EventCard extends Component {
  state = {};
  render() {
    return <div>
    <h4>{this.props.event.title}</h4>
    <p>{this.props.event.date}</p>
    <p>{this.props.event.location}</p>
  </div>;
  }
}

export default EventCard;

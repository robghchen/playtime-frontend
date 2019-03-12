import React, { Component } from "react";

class EventCard extends Component {
  state = {};
  render() {
    return <div>
    <img src={this.props.event.event_img} alt="event img" className="event-img" />
    <h4>{this.props.event.title}</h4>
    <p>{this.props.event.date}</p>
    <p>{this.props.event.location}</p>
  </div>;
  }
}

export default EventCard;

import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventCard extends Component {
  state = {};
  render() {
    return (
      <div>
        <span>
          <Link to={`/events/${this.props.event.id}`}>
            <img
              src={this.props.event.event_img}
              alt="event img"
              className="event-img"
            />
          </Link>
        </span>
        <span>
          <Link to={`/events/${this.props.event.id}`}>
            <h4>{this.props.event.title}</h4>
          </Link>
          <p>{this.props.event.date}</p>
          <p>{this.props.event.location}</p>
        </span>
      </div>
    );
  }
}

export default EventCard;

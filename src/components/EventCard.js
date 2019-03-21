import React, { Component } from "react";
import { Link } from "react-router-dom";

class EventCard extends Component {
  state = {};
  render() {
    let datetime = this.props.event.date;
    return (
      <div className="event-card">
        <span className="event-card-img">
          <Link to={`/events/${this.props.event.id}`}>
            <img
              src={this.props.event.event_img}
              alt="event img"
              className="event-img"
            />
          </Link>
        </span>
        <span className="event-card-info">
          <Link to={`/events/${this.props.event.id}`}>
            <h4>{this.props.event.title}</h4>
          </Link>
          <p>
            {datetime.slice(5, 7)}/{datetime.slice(8, 10)}/
            {datetime.slice(2, 4)} at {datetime.slice(11, 16)}
            <br />
            {this.props.event.location}
          </p>
        </span>
      </div>
    );
  }
}

export default EventCard;

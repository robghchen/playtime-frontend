import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EventCard from "../components/EventCard";

class EventsContainer extends Component {
  state = {};
  render() {
    return (
      <div className="events">
        <h2 className="center">Events</h2>
        {this.props.events
          .sort((a, b) => b.id - a.id)
          .map(event => {
            return (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(EventsContainer);

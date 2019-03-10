import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import EventCard from "../components/EventCard"
import Event from "../components/EventShowPage"

class EventsContainer extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="events">
      <h2 className="center">Events</h2>
        {this.props.events
        .reverse()
        .map(event => {
          return (
            <div key={Event.id}>
              <EventCard event={event} />
            </div>
          )
        })}
      </div>
     );
  }
}
 
export default withRouter(EventsContainer);
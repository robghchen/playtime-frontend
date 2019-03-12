import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EventCard from "./EventCard"

class MyEventsList extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          this.props.where === "newsContainer"
            ? "my-events-list--news"
            : "my-events-list"
        }
      >
        <h2 className="center">My Events</h2>
        Coming Soon
        {/* {this.props.events
          .map(event => {
            event.users.filter(user => {
              return user.id === this.props.currentUser.id;
            });
          })
          .reverse()
          .map(event => {
            return (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            );
          })} */}
      </div>
    );
  }
}

export default withRouter(MyEventsList);
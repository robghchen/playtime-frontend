import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import EventCard from "./EventCard";

class MyEventsList extends Component {
  state = {};
  render() {
    return (
      <div
        className={
          this.props.where === "newsContainer"
            ? "my-events-list-news"
            : "my-events-list"
        }
      >
        <h2 className="center">My Events</h2>
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
  <div>
        <Link to={"/events"}>
          <span>All Events</span>
        </Link>
        <span> | </span>
        <Link to={"/events/create"}>
          <span>Create Event</span>
        </Link></div>
      </div>
    );
  }
}

export default withRouter(MyEventsList);

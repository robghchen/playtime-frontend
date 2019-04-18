import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import EventCard from "./EventCard";

class MyEventsList extends Component {
  state = {};
  render() {
    // debugger;
    return (
      <div
        className={
          this.props.where === "newsContainer"
            ? "my-events-list-news"
            : "my-events-list"
        }
      >
        <h2 className="center">My Events</h2>
        {this.props.events.length > 0 ? (
          this.props.events
            .filter(event => {
              return event.date
                .slice(0, 10)
                .split("-")
                .join("") >
                new Date().getFullYear().toString() + new Date().getMonth() <
                10
                ? "0" + new Date().getMonth().toString()
                : new Date().getMonth().toString() + new Date().getDate() < 10
                ? "0" + new Date().getDate().toString()
                : new Date().getDate().toString();
            })
            // .filter(event => {
            //   return event.seats.find(seat => {
            //     return seat.user_id === this.props.currentUser.id;
            //   });
            // })
            .sort((a, b) => b.date - a.date)
            .map(event => {
              return (
                <div key={event.id}>
                  <EventCard event={event} />
                </div>
              );
            })
        ) : (
          <p>Loading . . .</p>
        )}
        <div>
          <Link to={"/events"}>
            <span>All Events</span>
          </Link>
          <span> | </span>
          <Link to={"/events/create"}>
            <span>Create Event</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(MyEventsList);

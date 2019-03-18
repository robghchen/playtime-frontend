import React, { Component } from "react";
import EventsContainer from "../containers/EventsContainer";
import SideBar from "../containers/SideBar";

class EventsPage extends Component {
  state = {};
  render() {
    return (
      <div className="column-layout">
        <EventsContainer
          currentUser={this.props.currentUser}
          events={this.props.events}
        />
        <SideBar
          currentUser={this.props.currentUser}
          activities={this.props.activities}
          events={this.props.events}
          tasks={this.props.tasks}
        />
      </div>
    );
  }
}

export default EventsPage;

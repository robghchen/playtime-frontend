import React, { Component } from "react";
import NewEventForm from "../components/NewEventForm";
import SideBar from "../containers/SideBar";

class EventsPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NewEventForm
          currentUser={this.props.currentUser}
          submitNewEventHandler={this.props.submitNewEventHandler}
        />
        <SideBar
          currentUser={this.props.currentUser}
          activities={this.props.activities}
          events={this.props.events}
          tasks={this.props.tasks}
        />
      </React.Fragment>
    );
  }
}

export default EventsPage;

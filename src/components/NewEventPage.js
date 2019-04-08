import React, { Component } from "react";
import NewEventForm from "../components/NewEventForm";
import SideBar from "../containers/SideBar";

class EventsPage extends Component {
  state = {};
  render() {
    return (
      <div className="column-layout">
        <NewEventForm
          currentUser={this.props.currentUser}
          submitNewEventHandler={this.props.submitNewEventHandler}
          seats={this.props.seats}
          addPost={this.props.addPost}
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

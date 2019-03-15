import React, { Component } from "react";
import EditProfileForm from "../components/EditProfileForm";
import SideBar from "../containers/SideBar";

class EventsPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <EditProfileForm
          isUserLoggedIn={this.props.isUserLoggedIn}
          currentUser={this.props.currentUser}
          updateHandler={this.props.updateHandler}
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

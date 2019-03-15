import React, { Component } from "react";
import ActivitiesContainer from "./ActivitiesContainer";
import DailyTasks from "../components/DailyTasks";
import MyEventsList from "../components/MyEventsList";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div className="side-bar">
        <DailyTasks
          tasks={this.props.tasks}
          currentUser={this.props.currentUser}
          where={this.props.where ? "newsContainer" : null}
        />
        <ActivitiesContainer
          activities={this.props.activities}
          currentUser={this.props.currentUser}
          where={this.props.where ? "newsContainer" : null}
        />
        <MyEventsList
          events={this.props.events}
          currentUser={this.props.currentUser}
          where={this.props.where ? "newsContainer" : null}
        />
      </div>
    );
  }
}

export default SideBar;

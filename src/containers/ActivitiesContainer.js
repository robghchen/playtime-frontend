import React, { Component } from "react";
import Activity from "../components/Activity";

class ActivitiesContainer extends Component {
  render() {
    return (
      <div className="activities-container">
        <h2 className="center">Activities</h2>
        {this.props.activities
          .filter(activity => {
            return activity.player_id === this.props.currentUser.id;
          })
          .reverse()
          .map(activity => {
            return (
              <div key={activity.id} className="">
                <Activity activity={activity} />
              </div>
            );
          })}
      </div>
    );
  }
}

export default ActivitiesContainer;

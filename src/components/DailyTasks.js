import React, { Component } from "react";
import Activity from "../components/Activity";

class DailyTasks extends Component {
  render() {
    const task = this.props.tasks.find(task => {
      return task.user_id === this.props.currentUser.id;
    });
    return (
      <React.Fragment>
        {this.props.tasks !== [] ? (
          <div>
            <h2 className="center">Daily Tasks</h2>
            <p>
              {task.post_count >= task.post_max
                ? "✅ "
                : `Posts: ${task.post_count} / ${task.post_max}`}{" "}
            </p>
            <p>
              {task.comment_count >= task.comment_max
                ? "✅ "
                : `Comments: ${task.comment_count} / ${task.comment_max}`}
            </p>{" "}
          </div>
        ) : (
          <p>Loading . . .</p>
        )}
      </React.Fragment>
    );
  }
}

export default DailyTasks;

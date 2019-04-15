import React, { Component } from "react";

class DailyTasks extends Component {
  render() {
    const task = this.props.tasks.find(task => {
      return task.user_id === this.props.currentUser.id;
    });
    return (
      <React.Fragment>
        {task ? (
          <div className={this.props.where === "newsContainer" ? "daily-tasks-news" : "daily-tasks"}>
            <h2 className="center">Daily Tasks</h2>
            <p>
              {task.post_count >= task.post_max
                ? "Posts: 1 / 1 ✅ "
                : `Posts: ${task.post_count} / ${task.post_max}`}{" "}
            </p>
            <p>
              {task.comment_count >= task.comment_max
                ? "Comments: 3 /3 ✅ "
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

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NewsContainer from "../containers/NewsContainer";
import ActivitiesContainer from "../containers/ActivitiesContainer";
import Banner from "../components/Banner";
import DailyTasks from "../components/DailyTasks";

class NewsFeed extends Component {
  state = {};

  render() {
    return this.props.currentUser.id > this.props.users.length ? (
      <h3>Loading . . .</h3>
    ) : (
      <React.Fragment>
        <br className="big-br" />
        <h1 className="center">NewsFeed</h1>
        <NewsContainer
          user_id={this.props.user_id}
          posts={this.props.posts}
          addPost={this.props.addPost}
          addComment={this.props.addComment}
          isUserLoggedIn={this.props.isUserLoggedIn}
          currentUser={this.props.currentUser}
          deleteHandler={this.props.deleteHandler}
          editPostHandler={this.props.editPostHandler}
          comments={this.props.comments}
          users={this.props.users}
        />
        <ActivitiesContainer
          activities={this.props.activities}
          currentUser={this.props.currentUser}
          where="newsContainer"
        />
        <DailyTasks
          tasks={this.props.tasks}
          currentUser={this.props.currentUser}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(NewsFeed);

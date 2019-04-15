import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NewsContainer from "../containers/NewsContainer";
import SideBar from "../containers/SideBar";

class NewsFeed extends Component {
  state = {};

  render() {
    return this.props.currentUser.id > this.props.users.length ? (
      <h3>Loading . . .</h3>
    ) : (
      <React.Fragment>
        <br className="big-br" />
        <h1 className="center">NewsFeed</h1>
        <div className="column-layout">
          <br className="big-br" />
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
          <SideBar
            currentUser={this.props.currentUser}
            activities={this.props.activities}
            events={this.props.events}
            tasks={this.props.tasks}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(NewsFeed);

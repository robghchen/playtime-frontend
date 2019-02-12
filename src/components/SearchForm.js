import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

class SearchForm extends Component {
  state = {};

  goSearch = () => {
    this.props.history.push("/search");
  };
  
  render() {
    return (
      <div className="ui card form search-form">
        <input
          onClick={this.goSearch}
          onChange={this.props.changeHandler}
          className="form-control"
          type="text"
          value={this.props.search}
          placeholder="Search users"
        />
      </div>
    );
  }
  className = "form-control";
}

export default withRouter(SearchForm);

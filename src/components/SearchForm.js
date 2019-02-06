import React, { Component } from "react";

class SearchForm extends Component {
  state = {};
  render() {
    return (
      <div className="ui card form search-form">
        <input
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

export default SearchForm;

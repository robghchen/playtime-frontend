import React, { Component } from "react";

class SearchForm extends Component {
  state = {};
  render() {
    return (
      <input onChange={this.props.changeHandler}
        className=""
        type="text"
        value={this.props.search}
        placeholder="Search users"
      />
    );
  }
  className = "form-control";
}

export default SearchForm;

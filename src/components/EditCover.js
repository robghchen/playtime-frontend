import React, { Component } from "react";

class EditCover extends Component {
  state = {
    input: ""
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input !== "") {
      this.props.editCover(this.state.input);

      this.setState({
        input: "",
        alert_error: false
      });
    } else {
      this.setState({ alert_error: true });
      this.props.history.push(`/home`);
    }
  };

  render() {
    return (
      <div className="ui card form cover">
        <form onSubmit={this.handleSubmit}>
          <textarea
            className="form-control"
            type="text"
            placeholder="Cover image url"
            cols="1200"
            rows="1"
            maxLength="600"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <input className="submit button pointer" type="submit" />
        </form>
      </div>
    );
  }
}

export default EditCover;

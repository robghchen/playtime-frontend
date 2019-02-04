import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NewPostForm extends Component {
  state = {
    input: "",
    alert_error: false,
    alert_error_mod_id: false
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input !== "") {
      if (this.props.currentUser.mod_id >= this.props.mod_id) {
        this.props.addPost(this.state.input, this.props.mod_id);
      } else {
        this.setState({ alert_error_mod_id: true });
      }

      this.setState({
        input: "",
        alert_error: false
      });
    } else {
      {
        this.setState({ alert_error: true });
      }
      this.props.history.push(`/mod/${this.props.mod_id}`);
    }
  };

  render() {
    return (
      <div id="new-post-form" className="ui card form">
        <form onSubmit={this.handleSubmit}>
          Write a note to a previous mod.
          <br />
          <textarea
            className="form-control"
            type="text"
            placeholder="Enter note"
            cols="120"
            rows="8"
            maxLength="140"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <p>Remaining Characters: {140 - this.state.input.length}</p>
          {this.state.alert_error ? (
            <span className="alert-error">No blank comment please.</span>
          ) : null}
          {this.state.alert_error_mod_id ? (
            <span className="alert-error">
              You cannot post to mods that you are not in or have not completed.
            </span>
          ) : null}
          <input className="submit button pointer" type="submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewPostForm);

import React, { Component } from "react";

class EditPostForm extends Component {
  state = {
    input: this.props.post.content,
    alert_error: false
  };

  changeHandler = e => {
    this.setState({ input: e.target.value, alert_error: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input.length > 0) {
      this.props.editPostHandler(this.props.post.id, this.state.input);
    } else {
      this.setState({ alert_error: true });
    }
  };

  render() {
    return (
      <div id="postit-form" className="ui">
        <form onSubmit={this.handleSubmit}>
          <textarea
            id="postit-input"
            cols="30"
            rows="8"
            maxLength="140"
            placeholder="Edit post"
            value={this.state.input}
            onChange={this.changeHandler}
          />

          <span className="author-edit">- {this.props.author}</span>

          <input
            id="postit-submit"
            className="pointer"
            type="submit"
            value="Update"
          />
        </form>
        <span id="edit-postit-alert-error">
          {this.state.alert_error ? "No blank comment please." : null}
        </span>
      </div>
    );
  }
}

export default EditPostForm;

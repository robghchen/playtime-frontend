import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NewPostForm extends Component {
  state = {
    input: "",
    friend_id: 1,
    alert_error: false,
    alert_error_mod_id: false
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input !== "") {
      this.props.addPost(this.state.input)
    

      this.setState({
        input: "",
        alert_error: false
      });
    } else {
      {
        this.setState({ alert_error: true });
      }
      this.props.history.push(`/home`);
    }
  };

  render() {
    return (
      <div id="new-post-form" className="ui card form">
        <form onSubmit={this.handleSubmit}>
          
          <br />
          <textarea
            className="form-control"
            type="text"
            placeholder="What's on your mind?"
            cols="600"
            rows="2"
            maxLength="600"
            value={this.state.input}
            onChange={this.handleChange}
          />
          
          {this.state.alert_error ? (
            <span className="alert-error">Post cannot be blank.</span>
          ) : null}
          
          <input className="submit button pointer" type="submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewPostForm);

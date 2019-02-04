import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NewCommentForm extends Component {
  state = {
    input: ""
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.input !== "") {
      this.props.addComment(
        this.state.input,
        this.props.currentUser.id,
        this.props.post.id
      );

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
      <div>
        <form>
          <textarea
            className="form-control"
            type="text"
            placeholder="Comment"
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

export default withRouter(NewCommentForm);

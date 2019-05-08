import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class NewEventForm extends Component {
  state = {
    title: "",
    price: "",
    date: "",
    location: "",
    description: "",
    banner_img: "",
    event_img: "",
    user_id: this.props.currentUser.id,
    enable_posts: true,
    enable_seats: false
  };
  render() {
    return (
      <div id="new-event-form" className="ui card form main-column">
        <h2>New Event</h2>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className="form-control"
            name="title"
            type="text"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.changeHandler}
          />
          <br />

          <label htmlFor="price">Price:</label>
          <input
            id="price"
            className="form-control"
            name="price"
            type="text"
            placeholder="Enter price"
            value={this.state.price}
            onChange={this.changeHandler}
          />
          <br />

          <label htmlFor="date">Date:</label>
          <input
            id="date"
            className="form-control"
            name="date"
            type="text"
            placeholder="Enter date"
            value={this.state.date}
            onChange={this.changeHandler}
          />
          <br />

          <label htmlFor="location">Location:</label>
          <input
            id="location"
            className="form-control"
            name="location"
            type="text"
            placeholder="Enter location"
            value={this.state.location}
            onChange={this.changeHandler}
          />
          <br />

          <div class="field">
            <label htmlFor="description">Description:</label>
            <textarea
              rows="2"
              id="description"
              className=""
              name="description"
              placeholder="Enter description"
              value={this.state.description}
              onChange={this.changeHandler}
            />
          </div>
          <br />

          <label htmlFor="banner-img">Banner Image:</label>
          <input
            id="banner-img"
            className="form-control"
            name="banner_img"
            type="text"
            placeholder="Enter banner image url"
            value={this.state.banner_img}
            onChange={this.changeHandler}
          />
          <br />

          <label htmlFor="event-img">Event image:</label>
          <input
            id="event-img"
            className="form-control"
            name="event_img"
            type="text"
            placeholder="Enter event image url"
            value={this.state.event_img}
            onChange={this.changeHandler}
          />

          <div className="new-event-form-selection">
            <div className="new-event-form-allow-posts">
              <p>Allow Posts and Comments:</p>
              <div>
                <label>
                  <input
                    className="form-control"
                    name="enable_posts"
                    type="radio"
                    value={true}
                    checked={this.state.enable_posts === true}
                    onChange={this.changeHandler}
                  />
                  Yes
                </label>
              </div>
              <div>
                <label>
                  <input
                    className="form-control"
                    name="enable_posts"
                    type="radio"
                    value={false}
                    checked={this.state.enable_posts === false}
                    onChange={this.changeHandler}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="new-event-form-allow-seats">
              <p>Enable Seat Reservations:</p>
              <div>
                <label>
                  <input
                    className="form-control"
                    name="enable_seats"
                    type="radio"
                    value={true}
                    checked={this.state.enable_seats === true}
                    onChange={this.changeHandler}
                  />
                  Yes
                </label>
              </div>
              <div>
                <label>
                  <input
                    className="form-control"
                    name="enable_seats"
                    type="radio"
                    value={false}
                    checked={this.state.enable_seats === false}
                    onChange={this.changeHandler}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {this.state.enable_seats ? (
            <React.Fragment>
              <div>
                Seats:{" "}
                {this.props.seats
                  .sort((a, b) => a.id - b.id)
                  .map(seat => (
                    <span key={seat.id}>{seat.position}, </span>
                  ))}
              </div>
              <br />

              <label htmlFor="position">Add Seat:</label>
              <input
                id="position"
                className="form-control"
                name="position"
                type="text"
                placeholder="Enter seat position"
                value={this.state.position}
                onChange={this.changeHandler}
              />
              <button
                onClick={e =>
                  this.submitSeatHandler(e, this.state.id, this.state.position)
                }
              >
                Add Seat
              </button>
              <br />
            </React.Fragment>
          ) : null}

          <br className="big-br" />

          <input
            type="submit"
            className="submit button pointer"
            value="Submit"
          />
        </form>
      </div>
    );
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]:
        e.target.value === "true"
          ? true
          : e.target.value === "false"
          ? false
          : e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let content = `${this.props.currentUser.username} created new event "${
      this.state.title
    }" happening on ${this.state.date.slice(5, 7)}/${this.state.date.slice(8, 10)}/${this.state.date.slice(2, 4)} at ${this.state.date.slice(11, 16)} at ${this.state.location}.`;

    this.props.submitNewEventHandler(this.state, e);

    this.props.addPost(
      content,
      this.props.currentUser.id,
      30
    );

    this.setState({
      title: "",
      price: "",
      date: "",
      location: "",
      description: "",
      banner_img: "",
      event_img: "",
      user_id: this.props.currentUser.id,
      enable_posts: true,
      enable_seats: false
    });
  };
}

export default withRouter(NewEventForm);

import React, { Component } from "react";

class EditEventForm extends Component {
  state = {
    id: this.props.currentEvent.id,
    title: this.props.currentEvent.title,
    price: this.props.currentEvent.price,
    date: this.props.currentEvent.date,
    location: this.props.currentEvent.location,
    description: this.props.currentEvent.description,
    banner_img: this.props.currentEvent.banner_img,
    event_img: this.props.currentEvent.event_img,
    user_id: this.props.currentEvent.user_id,
    enable_posts: this.props.currentEvent.enable_posts,
    enable_seats: this.props.currentEvent.enable_seats,
    users: this.props.currentEvent.users,
    seats: this.props.currentEvent.seats,
    position: ""
  };

  render() {
    return (
      <div id="new-event-form" className="ui card form">
        <h2>Edit Event</h2>
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

          <label htmlFor="description">Description:</label>
          <input
            id="description"
            className="form-control"
            name="description"
            type="text-area"
            placeholder="Enter description"
            value={this.state.description}
            onChange={this.changeHandler}
          />
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
          <br />

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
          <br />

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
          <br />

          {this.state.enable_seats ? (
            <React.Fragment>
              <div>
                Seats:{" "}
                {this.state.seats
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

          <button onClick={() => this.props.deleteEventHandler(this.state)}>
            Delete Event
          </button>

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

    this.props.updateEventHandler(this.state, e);
    this.setState({
      title: "",
      price: "",
      date: "",
      location: "",
      description: "",
      banner_img: "",
      event_img: "",
      user_id: null,
      enable_posts: true,
      enable_seats: false,
      users: [],
      seats: []
    });
  };

  submitSeatHandler = (e, event_id, position) => {
    e.preventDefault();

    this.props.addSeatHandler(e, event_id, position);
    this.setState({
      position: ""
    });
  };
}

export default EditEventForm;

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Event extends Component {
  state = {
    selectedOption: "option1"
  };

  changeSeatHandler = (e, oldId, newId, user_id) => {
    this.setState({
      selectedOption: e.target.value
    });

    this.props.editSeatHandler("add", oldId, newId, user_id);
  };

  render() {
    const event = this.props.events.find(
      event => event.id === this.props.event_id
    );
    let oldId = 0;

    if (
      event &&
      event.seats.find(seat => seat.user_id === this.props.currentUser.id)
    ) {
      oldId = event.seats.find(
        seat => seat.user_id === this.props.currentUser.id
      ).id;
    }

    return this.props.events.length < 1 ? (
      <p>Loading . . .</p>
    ) : (
      <div>
        <img src={event.banner_img} alt="banner" className="banner" />
        <img
          src={event.event_img}
          alt="event img"
          className="event-img-showpage"
        />
        <h3>{event.title}</h3>

        <form>
          {event.seats.map(seat => {
            return (
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value={seat.position}
                    checked={this.state.selectedOption === seat.position}
                    onChange={e =>
                      this.changeSeatHandler(
                        e,
                        oldId,
                        seat.id,
                        this.props.currentUser.id
                      )
                    }
                    disabled={seat.user_id ? true : null}
                  />
                  <span>{seat.position}</span>

                  {seat.user_id ? (
                    <span>
                      :{" "}
                      {
                        event.users.find(user => {
                          return user.id === seat.user_id;
                        }).username
                      }
                    </span>
                  ) : null}
                </label>
              </div>
            );
          })}
        </form>

        <p>{event.description}</p>

        <div>
          <h4>Attending</h4>
          <span>Yes</span>
          <span>No</span>
        </div>

        <div>
          <p>How much: ${event.price}</p>
          <p>When: {event.date}</p>
          <p>Where: {event.location}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Event);

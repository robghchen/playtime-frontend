import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import SideBar from "../containers/SideBar";

class EventShowPage extends Component {
  state = {
    selectedOption: ""
  };

  changeSeatHandler = (e, oldId, newId, user_id) => {
    this.setState({
      selectedOption: e.target.value
    });

    this.props.editSeatHandler("add", oldId, newId, user_id);
  };

  render() {
    const currentEvent = this.props.events.find(
      event => event.id === this.props.event_id
    );

    let oldId = 0;
    if (
      currentEvent &&
      currentEvent.seats.find(
        seat => seat.user_id === this.props.currentUser.id
      )
    ) {
      oldId = currentEvent.seats.find(
        seat => seat.user_id === this.props.currentUser.id
      ).id;
    }

    return this.props.events.length < 1 ? (
      <p>Loading . . .</p>
    ) : (
      <div>
        <img
          src={currentEvent.banner_img}
          alt="event banner"
          className="event-banner"
        />
        <img
          src={currentEvent.event_img}
          alt="event img"
          className="event-img-showpage"
        />
        <h3>{currentEvent.title}</h3>

        <form>
          {currentEvent.seats
            .sort((a, b) => a.id - b.id)
            .map(seat => {
              return (
                <div key={seat.id} className="radio">
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
                          currentEvent.users.find(user => {
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

        <p>{currentEvent.description}</p>

        {currentEvent.user_id === this.props.currentUser.id ? (
          <Link
            to={`/events/${currentEvent.id}/edit`}
            onClick={() => this.props.setEventHandler(currentEvent)}
          >
            <h4>Edit Event</h4>
          </Link>
        ) : null}

        <div>
          <h4>Attending</h4>
          <span>Yes</span>
          <span>No</span>
        </div>

        <div>
          <p>How much: ${currentEvent.price}</p>
          <p>When: {currentEvent.date}</p>
          <p>Where: {currentEvent.location}</p>
        </div>

        <SideBar
          currentUser={this.props.currentUser}
          activities={this.props.activities}
          events={this.props.events}
          tasks={this.props.tasks}
        />
      </div>
    );
  }
}

export default withRouter(EventShowPage);

import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import SideBar from "../containers/SideBar";

class EventShowPage extends Component {
  state = {
    selectedOption: ""
  };

  changeSeatHandler = (e, oldId, newId, user_id, username) => {
    this.setState({
      selectedOption: e.target.value
    });

    this.props.editSeatHandler("add", oldId, newId, user_id, username);
  };

  openInNewTab = url => {
    let win = window.open(url, "_blank");
    win.focus();
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

    return this.props.events.length < 1 || currentEvent === undefined ? (
      <p>Loading . . .</p>
    ) : (
      <React.Fragment>
        <img
          src={currentEvent.banner_img}
          alt="event banner"
          className="event-banner pointer"
          onClick={() => this.openInNewTab(`${currentEvent.banner_img}`)}
        />
        <div className="column-layout">
          <div className="main-column">
            <div className="event-showpage-topbar">
              <span className="event-showpage-img">
                <img
                  src={currentEvent.event_img}
                  alt="event img"
                  className="event-img"
                />
              </span>
              <h3 className="event-showpage-title">{currentEvent.title}</h3>

              <div className="event-showpage-info">
                <p>
                  How much: ${currentEvent.price}
                  <br />
                  When: {currentEvent.date.slice(5, 7)}/
                  {currentEvent.date.slice(8, 10)}/
                  {currentEvent.date.slice(2, 4)} at{" "}
                  {currentEvent.date.slice(11, 16)}
                  <br />
                  Where: {currentEvent.location}
                </p>
              </div>

              <div className="event-showpage-attending">
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
                  {" | "}
                  <span>No</span>
                </div>
              </div>
            </div>
            <div className="event-showpage-main">
              <p className="event-showpage-description">
                {currentEvent.description}
              </p>
              <div className="event-showpage-selection">
                <h4>Reserve your seat:</h4>
                <br />
                <form>
                  {currentEvent.seats
                    .sort((a, b) => a.position - b.position)
                    .map(seat => {
                      return (
                        <div key={seat.id} className="radio">
                          <label className={seat.user_id ? null : "pointer"}>
                            <input
                              type="radio"
                              value={seat.position}
                              checked={
                                this.state.selectedOption === seat.position
                              }
                              onChange={e =>
                                this.changeSeatHandler(
                                  e,
                                  oldId,
                                  seat.id,
                                  this.props.currentUser.id,
                                  this.props.currentUser.username
                                )
                              }
                              disabled={seat.user_id ? true : null}
                              className={seat.user_id ? null : "pointer"}
                            />
                            <span> {seat.position}</span>

                            {seat.username && seat.user_id !== 0 ? (
                              <Link to={`/user/${seat.user_id}`}>
                                <span>:{` ${seat.username}`}</span>
                              </Link>
                            ) : seat.user_name ? (
                              <span>: {` ${seat.username}`}</span>
                            ) : null}

                            {this.props.currentUser.id === seat.user_id ? (
                              <span>
                                <span role="img" aria-label="point right">
                                  {" "}
                                  👉{" "}
                                </span>

                                <Link to={`/events/${currentEvent.id}`}>
                                  <span
                                    onClick={() =>
                                      this.openInNewTab(
                                        `/assets/${seat.ticket_img}.pdf`
                                      )
                                    }
                                  >
                                    {" "}
                                    View Ticket{" "}
                                  </span>
                                </Link>

                                <span role="img" aria-label="point left">
                                  {" "}
                                  👈{" "}
                                </span>
                              </span>
                            ) : null}
                          </label>
                        </div>
                      );
                    })}
                </form>
              </div>
            </div>
          </div>
          <SideBar
            currentUser={this.props.currentUser}
            activities={this.props.activities}
            events={this.props.events}
            tasks={this.props.tasks}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(EventShowPage);

import React from "react";
// import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SignUpForm from "../components/SignUpForm";
import { animateScroll } from "react-scroll";

class HomePage extends React.Component {
  state = {
    loginUsername: "Guest",
    loginPassword: "Guest"
  };

  scrollToTop = event => {
    this.props.submitLoginHandler(this.state, event);
    animateScroll.scrollToTop();
  };

  render() {
    return (
      <div className="homepage">
        <div className="homepage-banner">
          <div className="homepage-banner-background">
            <div className="homepage-banner-text">
              <h1 className="center playtime">
                PlayTime!{" "}
                <span role="img" aria-label="clock">
                  ⏰
                </span>
              </h1>
              <h3 className="center slogan">
                Sign up to reserve a seat and view your movie ticket
              </h3>
            </div>
          </div>
        </div>

        <div className="center homepage-tagline">
          <h2>Hang out and enjoy the show!</h2>
        </div>

        <div className="column-layout">
          <div className="main-column">
            <img
              src="/assets/tilt.jpg"
              alt="tilt"
              className="homepage-images"
            />
            <img
              src="/assets/fire.jpg"
              alt="fire"
              className="homepage-images"
            />
            <img
              src="/assets/table.jpg"
              alt="table"
              className="homepage-images"
            />
            <img src="/assets/ppl.jpg" alt="ppl" className="homepage-images" />
            <img src="/assets/ny.jpg" alt="ny" className="homepage-images" />
            <img
              src="/assets/rock.jpg"
              alt="rock"
              className="homepage-images"
            />
            <img
              src="/assets/carousel.jpg"
              alt="carousel"
              className="homepage-images"
            />
            <img src="/assets/wut.jpg" alt="wut" className="homepage-images" />
            <img
              src="/assets/food.jpg"
              alt="food"
              className="homepage-images"
            />
          </div>
          <div className="sidebar-right">
            <SignUpForm
              className="homepage-signup"
              submitSignUpHandler={this.props.submitSignUpHandler}
            />
            <span
              className="center demo pointer"
              onClick={event => this.scrollToTop(event)}
            >
              <p>1-Click Demo</p>
            </span>
          </div>
        </div>

        {/* <div className="center">
          <h2>Continuing the conversation online should also be fun!</h2>
        </div>

        <div className="call-outs-container">
          <div className="call-out">
            <img
              src="/assets/activities.png"
              className="call-out-images"
              alt="activities"
            />
            <h3 className="call-out-text">
              Gain experience by making posts and comments.
            </h3>
          </div>
          <div className="call-out">
            <img
              src="/assets/levelupclose.png"
              className="call-out-images"
              alt="level up"
            />
            <h3 className="call-out-text">
              Level Up and unlock more abilities together!
            </h3>
          </div>
          <div className="call-out">
            <img src="/assets/nav.png" className="call-out-images" alt="nav" />
            <h3 className="call-out-text">
              Complete daily goals to level up faster!!
            </h3>
          </div>
        </div> */}
      </div>
    );
  }
}

export default HomePage;

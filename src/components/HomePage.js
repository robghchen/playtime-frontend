import React from "react";
// import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SignUpForm from "../components/SignUpForm";

class HomePage extends React.Component {
  state = {};
  render() {
    return (
      <div className="homepage">
        <div className="homepage-banner">
          <div className="homepage-banner-text">
            <h1 className="center playtime">PlayTime! ⏰</h1>
            <h3 className="center slogan">
              Social Media where you actually talk to friends :)
            </h3>
          </div>
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
            <SignUpForm submitSignUpHandler={this.props.submitSignUpHandler}/>
          </div>
        </div>

        <div className="center"><h2>Hanging out with friends online should be fun ^^</h2></div>

        <div class="call-outs-container">
          <div class="call-out">
            <img src="/assets/activities.png" className="call-out-images" />
            <h3 className="call-out-text">
              Gain experience by making posts and comments.
            </h3>
          </div>
          <div class="call-out">
            <img src="/assets/levelupclose.png" className="call-out-images" />
            <h3 className="call-out-text">
              Level Up and unlock more abilities together!
            </h3>
          </div>
          <div class="call-out">
            <img src="/assets/nav.png" className="call-out-images" />
            <h3 className="call-out-text">
              Complete daily goals to level up faster!!
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

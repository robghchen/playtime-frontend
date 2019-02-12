import React from "react";
// import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import SignUpForm from "../components/SignUpForm";

class HomePage extends React.Component {
  state = {};
  render() {
    return (
      <div className="homepage">
        <h1 className="center playtime">PlayTime! ⏰</h1>
          <h3 className="one-text">
            Social Media where you actually talk to friends
          </h3>
          <h3 className="two-text">
            Gain experience by engaging with posts and comments
          </h3>
          <h3 className="three-text">
            Level Up and unlock more abilities together
          </h3>
          <h3 className="four-text">
            Complete daily goals to level up faster
          </h3>

          <img
            src="/assets/fire.jpg"
            alt="fire"
            className="homepage-images one"
          />
          <img
            src="/assets/jump.jpg"
            alt="jump"
            className="homepage-images two"
          />
          <img src="/assets/food.jpg" className="homepage-images three" />
          <img src="/assets/ppl.jpg" className="homepage-images four" />
      </div>
    );
  }
}

export default HomePage;

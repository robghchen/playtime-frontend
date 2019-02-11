import React from "react";
import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import SignUpForm from "../components/SignUpForm";

class HomePage extends React.Component {
  state = {};
  render() {
    return (
      <div className="homepage">

<Carousel>
                <div>
                    <img src="assets/jump.jpeg" />
                    <p className="homepage-images">Legend 1</p>
                </div>
                <div>
                    <img src="assets/fire.jpeg" />
                    <p className="homepage-images">Legend 2</p>
                </div>
                <div>
                    <img src="assets/walk.jpeg" />
                    <p className="homepage-images">Legend 3</p>
                </div>
                <div>
                    <img src="assets/fiid.jpeg" />
                    <p className="homepage-images">Legend 3</p>
                </div>
            </Carousel>




        <h1>PlayTime</h1>
        <div className="left">
          <h3 className="right">
            Social Media where you actually want to talk to friends
          </h3>
          <img src="/media/fire.jpg" className="homepage-images" alt="fire" />
        </div>
        <div className="right">
          <h3 className="left">
            Level Up and unlock more abilities with your friends
          </h3>
          <img src="/media/food.jpg" className="homepage-images" alt="food" />
        </div>
        <div className="left">
          <h3 className="right">
            Gain experience by engaging with your friends
          </h3>
          <img src="/media/jump.jpg" className="homepage-images" alt="jump" />
        </div>
        <div className="right">
          <h3 className="left">Complete daily goals to level up faster</h3>
          <img src="/media/walk.jpg" className="homepage-images" alt="walk" />
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

class NavBar extends Component {
  render() {
    return (
      <div className="ui menu navBar navbar-layout">
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to={"/home"} className="item">
              <span onClick={this.props.clearSearch}>
                PlayTime!{" "}
                <span role="img" aria-label="alarm clock">
                  ⏰
                </span>
              </span>
            </Link>
          </div>
          {this.props.isUserLoggedIn ? (
            <div className="navbar-stats">
              <div className="lvl">Lvl {this.props.currentUser.lvl}</div>
              <div className="exp">
                Exp: {this.props.currentUser.exp} /{" "}
                {this.props.currentUser.exp_limit}
              </div>
              <div className="energy">
                Energy: {this.props.currentUser.energy} /{" "}
                {this.props.currentUser.max_energy}
              </div>
            </div>
          ) : null}
        </div>

        <div className="navbar-search">
          <SearchForm
            search={this.props.search}
            changeHandler={this.props.changeHandler}
          />
        </div>
        <div className="navbar-right">
          {this.props.isUserLoggedIn ? (
            <span className="ui menu">
              <Link to={"/profile"} className="item">
                <span onClick={this.props.clearSearch}>
                  <img
                    src={this.props.currentUser.profile_img}
                    alt="profile pic"
                    className="profile-picture-nav"
                  />
                </span>
              </Link>
              <Link to={"/editProfile"} className="item">
                <span onClick={this.props.clearSearch}>Edit Profile</span>
              </Link>
              <span className="item pointer" onClick={this.props.logout}>
                <span onClick={this.props.clearSearch}>Logout</span>
              </span>
            </span>
          ) : (
            <span className="ui menu">
              <Link to={"/login"} className="item">
                <span onClick={this.props.clearSearch}>Login</span>
              </Link>
              <Link to={"/signup"} className="item">
                <span onClick={this.props.clearSearch}>Sign Up</span>
              </Link>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default NavBar;

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

class NavBar extends Component {
  render() {
    return (
      <div className="ui menu navBar">
        <Fragment>
          <Link to={"/home"} className="item">
            <span onClick={this.props.clearSearch}>PlayTime <span role="img" aria-label="alarm clock">⏰</span></span>
          </Link>
          {this.props.isUserLoggedIn ? (
            <div className="stats">
              <div className="lvl">Lvl {this.props.currentUser.lvl}</div>
              <div className="exp">Exp: {this.props.currentUser.exp}</div>
              <div className="energy">
                Energy: {this.props.currentUser.energy} /{" "}
                {this.props.currentUser.max_energy} ⚡️
              </div>
            </div>
          ) : null}
          <SearchForm
            search={this.props.search}
            changeHandler={this.props.changeHandler}
          />
        </Fragment>
        {this.props.isUserLoggedIn ? (
          <span className="ui menu navright">
            <Link to={"/editProfile"} className="item">
              <span onClick={this.props.clearSearch}>Edit Profile</span>
            </Link>
            <span className="item pointer" onClick={this.props.logout}>
              <span onClick={this.props.clearSearch}>Logout</span>
            </span>
          </span>
        ) : (
          <span className="ui menu navright">
            <Link to={"/login"} className="item">
              <span onClick={this.props.clearSearch}>Login</span>
            </Link>
            <Link to={"/signup"} className="item">
              <span onClick={this.props.clearSearch}>Sign Up</span>
            </Link>
          </span>
        )}
      </div>
    );
  }
}

export default NavBar;

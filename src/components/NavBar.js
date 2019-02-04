import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="ui menu navBar">
        <Fragment>
          <Link to={"/home"} className="item">
            PlayTime
          </Link>
          {this.props.currentPath === "/home" ? null : (
            <Fragment>
              <p>energy bar</p>
            </Fragment>
          )}
        </Fragment>
        {this.props.isUserLoggedIn ? (
          <span className="ui menu navright">
            <Link to={"/editProfile"} className="item">
              Edit Profile
            </Link>
            <span className="item pointer" onClick={this.props.logout}>
              Logout
            </span>
          </span>
        ) : (
          <span className="ui menu navright">
            <Link to={"/login"} className="item">
              Login
            </Link>
            <Link to={"/signup"} className="item">
              SignUp
            </Link>
          </span>
        )}
      </div>
    );
  }
}

export default NavBar;

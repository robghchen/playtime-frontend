import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

class NavBar extends Component {
  render() {
    // console.log(this.props.currentUser);
    return (
      <div className="ui menu navBar">
        <Fragment>
          <Link to={"/home"} className="item">
            PlayTime
          </Link>
          {this.props.isUserLoggedIn ? (
            <div className="stats">
              <div className="energy">Energy: {this.props.currentUser.energy} / {this.props.currentUser.max_energy}</div>
              <div className="lvl">Lvl {this.props.currentUser.lvl}</div>
              <div className="exp">Exp: {this.props.currentUser.exp}</div>
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

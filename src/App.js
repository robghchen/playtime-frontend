import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { Route, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUsers } from "./actions/userActions";
import { connect } from "react-redux";
import UserShowPage from "./containers/PostsContainer";
import EditProfileForm from "./components/EditProfileForm";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SearchPage from "./components/SearchPage";

class App extends Component {
  state = {
    isUserLoggedIn: false,
    currentUser: {
      id: 0,
      first_name: "",
      last_name: "",
      username: "",
      // password: "",
      email: "",
      city: "",
      school: "",
      work: "",
      lvl: 1,
      exp: 0,
      energy: 5,
      max_energy: 5,
      speed: 1,
      profile_img:
        "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
      cover_img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
    },
    users: [],
    posts: [],
    comments: [],
    token: "",
    search: ""
  };

  componentDidMount() {
    this.props.getUsers();

    fetch("http://localhost:3000/api/v1/posts")
      .then(resp => resp.json())
      .then(posts => {
        this.setState({ posts });
      });

    fetch("http://localhost:3000/api/v1/comments")
      .then(resp => resp.json())
      .then(comments => {
        this.setState({ comments });
      });

    if (localStorage.getItem("token") !== null) {
      this.setState({
        currentUser: {
          id: parseInt(localStorage.getItem("id")),
          username: localStorage.getItem("username"),
          first_name: localStorage.getItem("first_name"),
          last_name: localStorage.getItem("last_name"),
          email: localStorage.getItem("email"),
          city: localStorage.getItem("city"),
          school: localStorage.getItem("school"),
          work: localStorage.getItem("work"),
          lvl: localStorage.getItem("lvl"),
          exp: localStorage.getItem("exp"),
          energy: localStorage.getItem("energy"),
          max_energy: localStorage.getItem("max_energy"),
          speed: localStorage.getItem("speed"),
          profile_img: localStorage.getItem("profile_img"),
          cover_img: localStorage.getItem("cover_img")
        },
        token: localStorage.getItem("token"),
        isUserLoggedIn: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(users => {
        localStorage.setItem("users", JSON.stringify(users));
      });
  }

  componentWillUnmount() {
    localStorage.clear();
  }

  statusHandler = () => {
    
  }

  changeHandler = e => {
    this.setState({
      search: e.target.value
    });
  };

  clearSearch = () => {
    this.setState({
      search: ""
    });
  };

  render() {
    console.log(this.state.currentUser);
    return (
      <div>
        <NavBar
          isUserLoggedIn={this.state.isUserLoggedIn}
          logout={this.logout}
          currentPath={this.props.location.pathname}
          search={this.state.search}
          changeHandler={this.changeHandler}
          currentUser={this.state.currentUser}
        />

        {this.state.search === "" ? (
          <Switch>
            <Route
              path="/home"
              render={RouterProps => {
                return this.state.isUserLoggedIn ? (
                  <UserShowPage
                    user_id={this.state.currentUser.id}
                    posts={this.state.posts}
                    addPost={this.addPost}
                    addComment={this.addComment}
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    currentUser={this.state.currentUser}
                    deleteHandler={this.deleteHandler}
                    editPostHandler={this.editPostHandler}
                    comments={this.state.comments}
                    users={JSON.parse(localStorage.getItem("users"))}
                    editCover={this.editCover}
                    editProfilePic={this.editProfilePic}
                  />
                ) : (
                  <HomePage />
                );
              }}
            />
            <Route
              path="/user/:id"
              render={RouterProps => {
                return (
                  <UserShowPage
                    user_id={parseInt(RouterProps.match.params.id)}
                    posts={this.state.posts}
                    addPost={this.addPost}
                    addComment={this.addComment}
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    currentUser={this.state.currentUser}
                    deleteHandler={this.deleteHandler}
                    editPostHandler={this.editPostHandler}
                    comments={this.state.comments}
                    users={JSON.parse(localStorage.getItem("users"))}
                    editCover={this.editCover}
                    editProfilePic={this.editProfilePic}
                  />
                );
              }}
            />
            <Route
              path="/search"
              render={() => {
                return (
                  <SearchPage
                    clearSearch={this.clearSearch}
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    search={this.state.search}
                    users={this.props.users}
                  />
                );
              }}
            />
            <Route
              path="/editProfile"
              render={() => {
                return (
                  <EditProfileForm
                    isUserLoggedIn={this.state.isUserLoggedIn}
                    currentUser={this.state.currentUser}
                    updateHandler={this.updateHandler}
                    mods={this.state.mods}
                  />
                );
              }}
            />
            <Route
              path="/login"
              render={() => {
                return (
                  <LoginForm submitLoginHandler={this.submitLoginHandler} />
                );
              }}
            />
            <Route
              path="/signUp"
              render={() => {
                return (
                  <SignUpForm submitSignUpHandler={this.submitSignUpHandler} />
                );
              }}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        ) : (
          <SearchPage
            clearSearch={this.clearSearch}
            isUserLoggedIn={this.state.isUserLoggedIn}
            search={this.state.search}
            users={this.props.users}
          />
        )}
      </div>
    );
  }

  addPost = (input, playerId, friendId) => {
    fetch("http://localhost:3000/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        content: input,
        player_id: playerId,
        friend_id: friendId
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.posts];
        newArr.push(data);
        this.setState({ posts: newArr });
      });
  };

  addComment = (input, playerId, postId) => {
    fetch("http://localhost:3000/api/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        comment: input,
        user_id: playerId,
        post_id: postId
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.comments, data];
        this.setState({ comments: newArr });
      });
  };

  editCover = input => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        cover_img: input
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.users];
        newArr = newArr.map(user => {
          if (user.id === this.state.currentUser.id) {
            return data;
          } else {
            return user;
          }
        });
        this.setState({ users: newArr });
      });
  };

  editProfilePic = input => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        profile_img: input
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.users];
        newArr = newArr.map(user => {
          if (user.id === this.state.currentUser.id) {
            return data;
          } else {
            return user;
          }
        });
        this.setState({ users: newArr });
      });
  };

  updateHandler = currentUser => {
    this.setState({ currentUser });

    fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.state.token
      },
      body: JSON.stringify({
        username: currentUser.username,
        password: currentUser.password
      })
    })
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          currentUser: {
            id: user.id,
            username: user.username
          }
        });
        this.props.history.push("/home");
      });
  };

  submitSignUpHandler = (userInfo, event) => {
    event.preventDefault();
    this.createUser(userInfo);
    this.props.history.push("/home");
  };

  createUser = userInfo => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then(res => {
        if (res.status === 406) throw new Error(res.status);
        else return res.json();
      })
      .then(res => {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("username", res.user.username);
        //come back
        this.setState({
          isUserLoggedIn: true,
          token: localStorage.getItem("token"),
          currentUser: {
            id: res.user.id,
            username: res.user.username,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            password: ""
          }
        });
      })
      .catch(error => {
        localStorage.setItem("signupError", "Duplicate account");
        this.props.history.push("/signup");
      });
  };

  submitLoginHandler = (userInfo, event) => {
    event.preventDefault();
    this.getUser(userInfo);
    this.props.history.push("/home");
  };

  getUser = userInfo => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: userInfo.loginUsername,
        password: userInfo.loginPassword
      })
    })
      .then(res => {
        if (res.status === 401) throw new Error(res.status);
        else return res.json();
      })
      // .then(res => res.json())
      .then(res => {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("first_name", res.user.first_name);
        localStorage.setItem("last_name", res.user.last_name);
        localStorage.setItem("email", res.user.email);
        localStorage.setItem("city", res.user.city);
        localStorage.setItem("school", res.user.school);
        localStorage.setItem("work", res.user.work);
        localStorage.setItem("lvl", res.user.lvl);
        localStorage.setItem("exp", res.user.exp);
        localStorage.setItem("energy", res.user.energy);
        localStorage.setItem("max_energy", res.user.max_energy);
        localStorage.setItem("speed", res.user.speed);
        localStorage.setItem("profile_img", res.user.profile_img);
        localStorage.setItem("cover_img", res.user.cover_img);

        this.setState({
          isUserLoggedIn: true,
          token: localStorage.getItem("token"),
          currentUser: {
            id: res.user.id,
            username: res.user.username,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            email: res.user.email,
            password: "",
            city: res.user.city,
            school: res.user.school,
            work: res.user.work,
            lvl: res.user.lvl,
            exp: res.user.exp,
            energy: res.user.energy,
            max_energy: res.user.max_energy,
            speed: res.user.speed,
            profile_img: res.user.profile_img,
            cover_img: res.user.cover_img
          }
        });
      })
      .catch(error => {
        localStorage.setItem("loginError", "Invalid account/password");
        this.props.history.push("/login");
        // this.setState({ alert_error: true });
        // alert(`HTTP ERROR: ${error}, Unknown account or password!`);
      });
  };

  logout = () => {
    //need to remove local storage token
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");

    this.setState({
      currentUser: {
        id: 0,
        username: ""
      },
      isUserLoggedIn: false,
      token: ""
    });

    this.props.history.push("/home");
  };

  deleteHandler = id => {
    const posts = [...this.state.posts].filter(post => post.id !== id);
    this.setState({ posts });
  };

  editPostHandler = (id, content) => {
    fetch(`http://localhost:3000/api/v1/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.state.token
      },
      body: JSON.stringify({
        content
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.posts];
        newArr = newArr.map(post => {
          if (post.id === id) {
            return data;
          } else {
            return post;
          }
        });
        this.setState({ posts: newArr });
      });
  };
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: bindActionCreators(getUsers, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

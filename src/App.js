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
      exp: 0
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
          username: localStorage.getItem("username")
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
    return (
      <div>
        <NavBar
          isUserLoggedIn={this.state.isUserLoggedIn}
          logout={this.logout}
          currentPath={this.props.location.pathname}
          search={this.state.search}
          changeHandler={this.changeHandler}
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
        this.setState({
          isUserLoggedIn: true,
          token: localStorage.getItem("token"),
          currentUser: {
            id: res.user.id,
            username: res.user.username,
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
        localStorage.setItem("username", res.user.username);
        localStorage.setItem("id", res.user.id);
        this.setState({
          isUserLoggedIn: true,
          token: localStorage.getItem("token"),
          currentUser: {
            id: res.user.id,
            username: res.user.username,
            password: ""
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

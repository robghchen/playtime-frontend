import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { Route, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUsers } from "./actions/userActions";
import { connect } from "react-redux";
import UserShowPage from "./components/UserShowPage";
import EditProfileForm from "./components/EditProfileForm";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SearchPage from "./components/SearchPage";
import NewsFeed from "./components/NewsFeed";

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
      exp_limit: 200,
      energy: 50,
      max_energy: 50,
      speed: 1,
      profile_img:
        "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
      cover_img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
    },
    users: [],
    filteredUsers: [],
    posts: [],
    comments: [],
    activities: [],
    tasks: [],
    token: "",
    search: "",
    energyClassName: "energy-hide"
  };

  componentDidMount() {
    // this.props.getUsers();

    fetch("http://localhost:3000/api/v1/users")
      .then(resp => resp.json())
      .then(users => {
        this.setState({ users, filteredUsers: users });

        if (localStorage.getItem("token") !== null) {
          let currentUser = users.find(user => {
            return user.id === parseInt(localStorage.getItem("id"));
          });
          this.setState({
            currentUser,
            token: localStorage.getItem("token"),
            isUserLoggedIn: true
          });
        }
        this.addEnergy();
      });

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

    fetch("http://localhost:3000/api/v1/activities")
      .then(resp => resp.json())
      .then(activities => {
        this.setState({ activities });
      });

    fetch("http://localhost:3000/api/v1/tasks")
      .then(resp => resp.json())
      .then(tasks => {
        this.setState({ tasks });
      });
  }

  // : {
  //   id: parseInt(localStorage.getItem("id")),
  //   username: localStorage.getItem("username"),
  //   first_name: localStorage.getItem("first_name"),
  //   last_name: localStorage.getItem("last_name"),
  //   email: localStorage.getItem("email"),
  //   city: localStorage.getItem("city"),
  //   school: localStorage.getItem("school"),
  //   work: localStorage.getItem("work"),
  //   lvl: localStorage.getItem("lvl"),
  //   exp: localStorage.getItem("exp"),
  //   exp_limit: localStorage.getItem("exp_limit"),
  //   energy: localStorage.getItem("energy"),
  //   max_energy: localStorage.getItem("max_energy"),
  //   speed: localStorage.getItem("speed"),
  //   profile_img: localStorage.getItem("profile_img"),
  //   cover_img: localStorage.getItem("cover_img")
  // }

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

  addEnergy = () => {
    setInterval(() => {
      if (this.state.currentUser.energy < this.state.currentUser.max_energy) {
        fetch(
          `http://localhost:3000/api/v1/users/${this.state.currentUser.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({
              energy: this.state.currentUser.energy + 1
            })
          }
        )
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
            this.setState({ users: newArr, currentUser: data });
          });
      }
    }, 300000);
  };

  completeTask = (activity, username, datetime, friendId) => {
    const task = this.state.tasks.find(
      task => task.user_id === this.state.currentUser.id
    );
    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        post_count: activity === "post" ? ++task.post_count : task.post_count,
        comment_count:
          activity === "comment" ? ++task.comment_count : task.comment_count
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.tasks];
        newArr = newArr.map(task => {
          if (task.user_id === this.state.currentUser.id) {
            return data;
          } else {
            return task;
          }
        });
        this.setState({ tasks: newArr });
      })
      .then(this.addActivity(activity, username, datetime, friendId));
  };

  // addStreak = (activity) => {
  // coming soon
  // }

  addActivity = (activity, username, datetime, friendId) => {
    fetch(`http://localhost:3000/api/v1/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        player_id: this.state.currentUser.id,
        friend_id: friendId,
        task:
          activity ===
          // "levelup"
          //   ? `You leveled up! Congrats on reaching Lvl ${username} on ${datetime.slice(
          //       5,
          //       7
          //     )}/${datetime.slice(8, 10)}/${datetime.slice(
          //       2,
          //       4
          //     )} at ${datetime.slice(11, 16)}.` :

          // : "post task"
          // ? `+100 exp, complete post task on ${datetime.slice(
          //     5,
          //     7
          //   )}/${datetime.slice(8, 10)}/${datetime.slice(
          //     2,
          //     4
          //   )} at ${datetime.slice(11, 16)}.`
          // : "comment task"
          // ? `+100 exp, complete comment task on ${datetime.slice(
          //     5,
          //     7
          //   )}/${datetime.slice(8, 10)}/${datetime.slice(
          //     2,
          //     4
          //   )} at ${datetime.slice(11, 16)}.`

          "post"
            ? `+60 exp, post to ${username} on ${datetime.slice(
                5,
                7
              )}/${datetime.slice(8, 10)}/${datetime.slice(
                2,
                4
              )} at ${datetime.slice(11, 16)}.`
            : "comment"
            ? `+40 exp, comment to ${username} on ${datetime.slice(
                5,
                7
              )}/${datetime.slice(8, 10)}/${datetime.slice(
                2,
                4
              )} at ${datetime.slice(11, 16)}.`
            : "tag"
            ? `+40 exp, tag ${username} on ${datetime.slice(
                5,
                7
              )}/${datetime.slice(8, 10)}/${datetime.slice(
                2,
                4
              )} at ${datetime.slice(11, 16)}.`
            : "reaction"
            ? `+20 exp, react to ${username} on ${datetime.slice(
                5,
                7
              )}/${datetime.slice(8, 10)}/${datetime.slice(
                2,
                4
              )} at ${datetime.slice(11, 16)}.`
            : null
      })
    })
      .then(res => res.json())
      .then(data => {
        let newArr = [...this.state.activities, data];
        this.setState({ activities: newArr });
      })
      .then(this.addExp(activity, datetime, friendId));
  };

  addExp = (activity, datetime, friendId) => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        username: this.state.currentUser.username,
        exp: (this.state.currentUser.exp =
          parseInt(this.state.currentUser.exp) +
          (activity === "post"
            ? 60
            : activity === "comment"
            ? 40
            : activity === "tag"
            ? 40
            : activity === "reaction"
            ? 20
            : 0)),
        energy: (this.state.currentUser.energy -=
          activity === "post"
            ? 20
            : activity === "comment"
            ? 5
            : activity === "tag"
            ? 5
            : activity === "reaction"
            ? 1
            : 0)
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
        this.setState({ users: newArr, currentUser: data });
      })
      .then(this.levelUp(datetime, friendId));
  };

  levelUp = (datetime, friendId) => {
    let currentUser = this.state.currentUser;
    if (currentUser.exp >= currentUser.exp_limit) {
      fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          lvl: (currentUser.lvl = parseInt(currentUser.lvl) + 1),
          exp: (currentUser.exp = currentUser.exp - currentUser.exp_limit),
          exp_limit: (currentUser.exp_limit = currentUser.exp_limit * 1.15),
          energy: (currentUser.max_energy = currentUser.max_energy * 1.05),
          max_energy: (currentUser.max_energy = currentUser.max_energy * 1.05)
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
          this.setState({ users: newArr, currentUser: data });
        });
      // .then(this.addActivity("levelup", currentUser.lvl, datetime, friendId));
    }
  };

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
    return this.state.users !== [] ? (
      <div>
        <NavBar
          isUserLoggedIn={this.state.isUserLoggedIn}
          logout={this.logout}
          currentPath={this.props.location.pathname}
          search={this.state.search}
          changeHandler={this.changeHandler}
          currentUser={this.state.currentUser}
          clearSearch={this.clearSearch}
        />

        {this.state.search === "" ? (
          <Switch>
            <Route
              path="/home"
              render={RouterProps => {
                return this.state.isUserLoggedIn ? (
                  this.state.currentUser.id > this.state.users.length ? (
                    <h3>Loading . . .</h3>
                  ) : (
                    <NewsFeed
                      user_id={this.state.currentUser.id}
                      posts={this.state.posts}
                      addPost={this.addPost}
                      addComment={this.addComment}
                      isUserLoggedIn={this.state.isUserLoggedIn}
                      currentUser={this.state.currentUser}
                      deleteHandler={this.deleteHandler}
                      comments={this.state.comments}
                      users={this.state.users}
                      activities={this.state.activities}
                      tasks={this.state.tasks}
                    />
                  )
                ) : (
                  <HomePage />
                );
              }}
            />
            <Route
              path="/profile"
              render={RouterProps => {
                return this.state.isUserLoggedIn ? (
                  this.state.currentUser.id > this.state.users.length ? (
                    <h3>Loading . . .</h3>
                  ) : (
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
                      users={this.state.users}
                      editCover={this.editCover}
                      editProfilePic={this.editProfilePic}
                      activities={this.state.activities}
                      tasks={this.state.tasks}
                    />
                  )
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
                    activities={this.state.activities}
                    tasks={this.state.tasks}
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
                    filteredUsers={this.state.filteredUsers}
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
                return this.state.isUserLoggedIn ? (
                  this.state.currentUser.id === 0 ? (
                    <h3>Loading . . .</h3>
                  ) : (
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
                      activities={this.state.activities}
                      tasks={this.state.tasks}
                    />
                  )
                ) : (
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
            filteredUsers={this.state.filteredUsers}
          />
        )}
        <div className={this.state.energyClassName}>
          <p className="red">Not enough energy at the moment.</p>
          <span onClick={this.energyHide} className="close pointer">
            x
          </span>
        </div>
      </div>
    ) : (
      <div className="loading">Loading . . .</div>
    );
  }

  addPost = (input, playerId, friendId) => {
    if (this.state.currentUser.energy >= 20) {
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
          let username = this.state.users.find(user => {
            return user.id === friendId;
          }).username;
          this.completeTask("post", username, data.created_at, friendId);
        });
    } else {
      this.energyShow();
    }
  };

  addComment = (input, playerId, postId) => {
    if (this.state.currentUser.energy >= 5) {
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
          let username = this.state.users.find(
            user => user.id === data.post.friend_id
          ).username;
          this.setState({ comments: newArr });
          this.completeTask(
            "comment",
            username,
            data.created_at,
            data.post.friend_id
          );
        });
    } else {
      this.energyShow();
    }
  };

  energyShow = () => {
    this.setState({ energyClassName: "energy-show" });
  };

  energyHide = () => {
    this.setState({ energyClassName: "energy-hide" });
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
        username: this.state.currentUser.username,
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
    console.log(input);
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        username: this.state.currentUser.username,
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
    fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: this.state.token
      },
      body: JSON.stringify({
        id: currentUser.id,
        username: currentUser.username,
        password: currentUser.password,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        city: currentUser.city,
        school: currentUser.school,
        work: currentUser.work,
        profile_img: currentUser.profile_img,
        cover_img: currentUser.cover_img
      })
    })
      .then(resp => resp.json())
      .then(currentUser => {
        this.setState({
          currentUser
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
        password: userInfo.password,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        lvl: 1,
        exp: 0,
        exp_limit: 200,
        energy: 50,
        max_energy: 50,
        speed: 1,
        city: "N/A",
        work: "N/A",
        school: "N/A",
        email: "N/A",
        profile_img:
          "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
        cover_img:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
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

        let newArr = [...this.state.users];
        newArr.push(res.user);

        this.setState({
          isUserLoggedIn: true,
          token: localStorage.getItem("token"),
          currentUser: {
            id: res.user.id,
            username: res.user.username,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            lvl: 1,
            exp: 0,
            exp_limit: 200,
            energy: 50,
            max_energy: 50,
            speed: 1,
            password: "",
            profile_img:
              "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
            cover_img:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
          },
          users: newArr
        });

        fetch("http://localhost:3000/api/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({
            user_id: res.user.id,
            post_count: 0,
            post_max: 1,
            comment_count: 0,
            comment_max: 3
          })
        })
          .then(res => res.json())
          .then(data => {
            let newArr = [...this.state.tasks, data];
            this.setState({ tasks: newArr });
          });
      })
      .catch(error => {
        localStorage.setItem("signupError", "Duplicate account/Invalid input");
        this.props.history.push("/signup");
      });
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
        localStorage.setItem("exp_limit", res.user.exp_limit);
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
            exp_limit: res.user.exp_limit,
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

import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUsers } from "./actions/userActions";
import { connect } from "react-redux";
import UserShowPage from "./components/UserShowPage";
import EditProfilePage from "./components/EditProfilePage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SearchPage from "./components/SearchPage";
import NewsFeed from "./components/NewsFeed";
import EventsContainer from "./containers/EventsContainer";
import EventShowPage from "./components/EventShowPage";
import EventsPage from "./components/EventsPage";
import NewEventPage from "./components/NewEventPage";
import EditEventForm from "./components/EditEventForm";

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
      energy: 25,
      max_energy: 25,
      speed: 1,
      profile_img:
        "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
      cover_img:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
    },
    currentEvent: {
      id: null,
      title: "",
      price: "",
      date: "",
      location: "",
      description: "",
      banner_img: "",
      event_img: "",
      user_id: null,
      enable_posts: true,
      enable_seats: false,
      users: [],
      seats: []
    },
    users: [],
    filteredUsers: [],
    posts: [],
    comments: [],
    activities: [],
    tasks: [],
    events: [],
    seats: [],
    token: "",
    search: "",
    energyClassName: "energy-hide",
    levelUpClassName: "level-up-hide"
  };

  componentDidMount() {
    // this.props.getUsers();

    fetch("https://playtime-backend.herokuapp.com/api/v1/users")
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

    fetch("https://playtime-backend.herokuapp.com/api/v1/posts")
      .then(resp => resp.json())
      .then(posts => {
        this.setState({ posts });
      });

    fetch("https://playtime-backend.herokuapp.com/api/v1/comments")
      .then(resp => resp.json())
      .then(comments => {
        this.setState({ comments });
      });

    fetch("https://playtime-backend.herokuapp.com/api/v1/activities")
      .then(resp => resp.json())
      .then(activities => {
        this.setState({ activities });
      });

    fetch("https://playtime-backend.herokuapp.com/api/v1/tasks")
      .then(resp => resp.json())
      .then(tasks => {
        this.setState({ tasks });
      });

    fetch("https://playtime-backend.herokuapp.com/api/v1/events")
      .then(resp => resp.json())
      .then(events => {
        this.setState({ events });
      });

    fetch("https://playtime-backend.herokuapp.com/api/v1/seats")
      .then(resp => resp.json())
      .then(seats => {
        this.setState({ seats });
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
    fetch("https://playtime-backend.herokuapp.com/api/v1/users")
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
          `https://playtime-backend.herokuapp.com/api/v1/users/${
            this.state.currentUser.id
          }`,
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
    }, 60000);
  };

  addPost = (input, playerId, friendId) => {
    if (this.state.currentUser.energy >= 10) {
      fetch("https://playtime-backend.herokuapp.com/api/v1/posts", {
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
      fetch("https://playtime-backend.herokuapp.com/api/v1/comments", {
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

  completeTask = (activity, username, datetime, friendId) => {
    const task = this.state.tasks.find(
      task => task.user_id === this.state.currentUser.id
    );

    if (
      task.post_count < task.post_max ||
      task.comment_count < task.comment_max
    ) {
      fetch(`https://playtime-backend.herokuapp.com/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          post_count:
            activity === "post" && task.post_count < task.post_max
              ? ++task.post_count
              : task.post_count,
          comment_count:
            activity === "comment" && task.comment_count < task.comment_max
              ? ++task.comment_count
              : task.comment_count
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
        });
    }
    this.addActivity(activity, username, datetime, friendId);
  };

  // addStreak = (activity) => {
  // coming soon
  // }

  addActivity = (activity, username, datetime, friendId) => {
    fetch(`https://playtime-backend.herokuapp.com/api/v1/activities`, {
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
            ? `+80 exp, post to ${username} on ${datetime.slice(
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
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/users/${
        this.state.currentUser.id
      }`,
      {
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
              ? 80
              : activity === "comment"
              ? 40
              : activity === "tag"
              ? 40
              : activity === "reaction"
              ? 20
              : 0)),
          energy: (this.state.currentUser.energy -=
            activity === "post"
              ? 10
              : activity === "comment"
              ? 5
              : activity === "tag"
              ? 5
              : activity === "reaction"
              ? 1
              : 0)
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

        if (data.exp >= data.exp_limit) {
          fetch(
            `https://playtime-backend.herokuapp.com/api/v1/users/${data.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: localStorage.getItem("token")
              },
              body: JSON.stringify({
                lvl: (data.lvl = parseInt(data.lvl) + 1),
                exp: (data.exp = data.exp - data.exp_limit),
                exp_limit: (data.exp_limit = data.exp_limit * 1.25),
                energy: (data.max_energy = data.max_energy * 1.05),
                max_energy: (data.max_energy = data.max_energy * 1.05)
              })
            }
          )
            .then(res => res.json())
            .then(userData => {
              let newArr = [...this.state.users];
              newArr = newArr.map(user => {
                if (user.id === this.state.currentUser.id) {
                  return userData;
                } else {
                  return user;
                }
              });
              this.setState({ users: newArr, currentUser: userData });
              this.levelUpShow();
            });
          // .then(this.addActivity("levelup", currentUser.lvl, datetime, friendId));
        }
      });
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
      <React.Fragment>
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
                        events={this.state.events}
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
                        events={this.state.events}
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
                      events={this.state.events}
                    />
                  );
                }}
              />
              <Route
                path="/events/create"
                render={() => {
                  return (
                    <NewEventPage
                      currentUser={this.state.currentUser}
                      activities={this.state.activities}
                      events={this.state.events}
                      tasks={this.state.tasks}
                      submitNewEventHandler={this.submitNewEventHandler}
                      seats={this.state.seats}
                    />
                  );
                }}
              />
              <Route
                path="/events/:id/edit"
                render={RouterProps => {
                  return (
                    <EditEventForm
                      currentEvent={this.state.currentEvent}
                      updateEventHandler={this.updateEventHandler}
                      deleteEventHandler={this.deleteEventHandler}
                      addSeatHandler={this.addSeatHandler}
                    />
                  );
                }}
              />
              <Route
                path="/events/:id"
                render={RouterProps => {
                  return (
                    <EventShowPage
                      currentUser={this.state.currentUser}
                      activities={this.state.activities}
                      events={this.state.events}
                      tasks={this.state.tasks}
                      event_id={parseInt(RouterProps.match.params.id)}
                      setEventHandler={this.setEventHandler}
                      editSeatHandler={this.editSeatHandler}
                      seats={this.state.seats}
                    />
                  );
                }}
              />
              <Route
                path="/events"
                render={RouterProps => {
                  return (
                    <EventsPage
                      currentUser={this.state.currentUser}
                      activities={this.state.activities}
                      events={this.state.events}
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
                    <EditProfilePage
                      isUserLoggedIn={this.state.isUserLoggedIn}
                      currentUser={this.state.currentUser}
                      updateHandler={this.updateHandler}
                      activities={this.state.activities}
                      events={this.state.events}
                      tasks={this.state.tasks}
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
                        events={this.state.events}
                      />
                    )
                  ) : (
                    <SignUpForm
                      submitSignUpHandler={this.submitSignUpHandler}
                    />
                  );
                }}
              />
              <Route
                path="/"
                render={() => {
                  return (
                    <HomePage submitSignUpHandler={this.submitSignUpHandler} />
                  );
                }}
              />
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
            <img
              src="/assets/noenergy.jpg"
              alt="no energy"
              className="no-energy-img"
            />
            <div className="no-energy-text">
              <p className="red">Not enough energy at the moment.</p>
              <span onClick={this.energyHide} className="close pointer">
                x
              </span>
            </div>
          </div>
          <div className={this.state.levelUpClassName}>
            <img
              src="/assets/levelup.jpg"
              alt="no energy"
              className="level-up-img"
            />
          </div>
        </div>
        <div className="footer">
          <p>
            Do you have any suggestions for us? Leave some{" "}
            <Link to={"/user/3"}>FeedBack</Link>
            <br />
            Made with ❤️ in NYC
            <br />
            <span>&copy; {new Date().getFullYear()}</span>
          </p>
        </div>
      </React.Fragment>
    ) : (
      <div className="loading">Loading . . .</div>
    );
  }

  energyShow = () => {
    this.setState({ energyClassName: "energy-show" });

    setTimeout(() => {
      this.setState({ energyClassName: "energy-hide" });
    }, 5000);
  };

  energyHide = () => {
    this.setState({ energyClassName: "energy-hide" });
  };

  levelUpShow = () => {
    this.setState({ levelUpClassName: "level-up-show" });

    setTimeout(() => {
      this.setState({ levelUpClassName: "level-up-hide" });
    }, 5000);
  };

  editCover = input => {
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/users/${
        this.state.currentUser.id
      }`,
      {
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
        this.setState({ users: newArr });
      });
  };

  editProfilePic = input => {
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/users/${
        this.state.currentUser.id
      }`,
      {
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
        this.setState({ users: newArr });
      });
  };

  updateHandler = currentUser => {
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/users/${currentUser.id}`,
      {
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
      }
    )
      .then(resp => resp.json())
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
        this.props.history.push("/profile");
      });
  };

  submitSignUpHandler = (userInfo, e) => {
    e.preventDefault();
    this.createUser(userInfo);
    this.props.history.push("/home");
  };

  createUser = userInfo => {
    fetch("https://playtime-backend.herokuapp.com/api/v1/users", {
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
        energy: 25,
        max_energy: 25,
        speed: 1,
        city: "N/A",
        work: "N/A",
        school: "N/A",
        email: "N/A",
        profile_img:
          "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
        cover_img:
          "https://hbr.org/resources/images/article_assets/2018/10/oct18_26_1040319418.jpg"
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
            energy: 25,
            max_energy: 25,
            speed: 1,
            password: "",
            profile_img:
              "https://c1.staticflickr.com/6/5643/23778807571_e9649ee35e_b.jpg",
            cover_img:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Friends_logo.svg/2000px-Friends_logo.svg.png"
          },
          users: newArr
        });

        fetch("https://playtime-backend.herokuapp.com/api/v1/tasks", {
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

  submitNewEventHandler = (eventInfo, e) => {
    e.preventDefault();

    fetch("https://playtime-backend.herokuapp.com/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: eventInfo.title,
        price: eventInfo.price,
        date: eventInfo.date,
        location: eventInfo.location,
        description: eventInfo.description,
        banner_img: eventInfo.banner_img,
        event_img: eventInfo.event_img,
        user_id: eventInfo.user_id,
        enable_posts: eventInfo.enable_posts,
        enable_seats: eventInfo.enable_seats
      })
    })
      .then(res => res.json())
      .then(event => {
        let newArr = [...this.state.events, event];
        this.setState({ events: newArr });
        this.props.history.push(`/events/${event.id}`);
      });
  };

  setEventHandler = currentEvent => {
    this.setState({ currentEvent });
  };

  updateEventHandler = currentEvent => {
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/events/${currentEvent.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.token
        },
        body: JSON.stringify({
          id: currentEvent.id,
          title: currentEvent.title,
          price: currentEvent.price,
          date: currentEvent.date,
          location: currentEvent.location,
          description: currentEvent.description,
          banner_img: currentEvent.banner_img,
          event_img: currentEvent.event_img,
          user_id: currentEvent.user_id,
          enable_posts: currentEvent.enable_posts,
          enable_seats: currentEvent.enable_seats
        })
      }
    )
      .then(resp => resp.json())
      .then(data => {
        let newArr = [...this.state.events];
        newArr = newArr.map(event => {
          if (event.id === data.id) {
            return data;
          } else {
            return event;
          }
        });
        this.setState({ events: newArr });
        this.props.history.push(`/events/${data.id}`);
      });
  };

  deleteEventHandler = currentEvent => {
    fetch(
      `https://playtime-backend.herokuapp.com/api/v1/events/${currentEvent.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.state.token
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log("data", data);
        // let newArr = [...this.state.events].filter(
        //   event => event.id !== data.id
        // );

        this.setState({ events: data });
      })
      .then(() => this.props.history.push("/events"))
      .then(console.log("state", this.state.events));
  };

  addSeatHandler = (e, event_id, position) => {
    e.preventDefault();

    fetch("https://playtime-backend.herokuapp.com/api/v1/seats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        event_id,
        position
      })
    }).then(() => {
      fetch("https://playtime-backend.herokuapp.com/api/v1/events")
        .then(res => res.json())
        .then(events => {
          this.setState({ events });
        });
    });
  };

  submitLoginHandler = (userInfo, event) => {
    event.preventDefault();
    this.getUser(userInfo);
    this.props.history.push("/home");
  };

  getUser = userInfo => {
    fetch("https://playtime-backend.herokuapp.com/api/v1/login", {
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
    fetch(`https://playtime-backend.herokuapp.com/api/v1/posts/${id}`, {
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

  editSeatHandler = (action, oldId, newId, user_id, username, i = 0) => {
    if (i < 2) {
      fetch(
        `https://playtime-backend.herokuapp.com/api/v1/seats/${
          action === "add" ? newId : oldId
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: this.state.token
          },
          body: JSON.stringify({
            user_id: action === "add" ? user_id : null,
            username: action === "add" ? username : null
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          let newArr = [...this.state.seats];
          newArr = newArr.map(seat => {
            if (seat.id === newId) {
              return data;
            } else {
              return seat;
            }
          });
          this.setState({ seats: newArr });
        })
        .then(() => {
          fetch("https://playtime-backend.herokuapp.com/api/v1/events")
            .then(resp => resp.json())
            .then(events => {
              this.setState({ events });
            });
        })
        .then(() => {
          if (oldId !== 0) {
            this.editSeatHandler(
              "remove",
              oldId,
              newId,
              user_id,
              username,
              (i = i + 1)
            );
          }
        });
    }
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

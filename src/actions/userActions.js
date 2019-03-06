export const LOAD_USERS = "LOAD_USERS";
export const CHANGE_USER = "CHANGE_USER";
export const ADD_USER = "ADD_USER";

export const getUsers = () => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users")
      .then(res => res.json())
      .then(users => {
        dispatch({
          type: LOAD_USERS,
          payload: users
        });
      })
      .catch(console.error);
  };
};

export const changeUsers = user => {
  return dispatch => {
    return {
      type: CHANGE_USER,
      payload: user
    };
  };
};

export const addUser = user => {
  return dispatch => {
    return fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: user.password,
        city: user.city,
        school: user.school,
        work: user.work,
        lvl: user.lvl,
        exp: user.exp,
        energy: user.energy,
        max_energy: user.max_energy,
        speed: user.speed,
        profile_img: user.profile_img,
        cover_img: user.cover_img
      })
    })
      .then(res => res.json())
      .then(user => {
        dispatch({
          type: ADD_USER,
          payload: user
        });
      })
      .catch(console.error);
  };
};

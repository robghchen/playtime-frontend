import { LOAD_USERS } from "../actions/userActions";

const initialState = {
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS: {
      return { ...state, users: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
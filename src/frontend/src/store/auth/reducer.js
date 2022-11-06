import { SET_USER, SET_TOKEN, SET_LOADING, SET_ERROR, } from "./actions"

export const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") ?? null,
  loading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      if (!action.payload)
        localStorage.removeItem("user");
      else
        localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case SET_TOKEN:
      if (!action.payload)
        localStorage.removeItem("token");
      else
        localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default reducer;
export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function setToken(payload) {
  return {
    type: SET_TOKEN,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

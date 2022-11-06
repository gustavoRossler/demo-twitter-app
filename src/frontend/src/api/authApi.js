import axiosClient from "./basicClient";

export default {
  login: async ({ username, password }) => {
    const res = await axiosClient.post("/login", { username, password });
    return res?.data;
  },
};

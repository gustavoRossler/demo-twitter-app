import axiosClient from "./basicClient";

export default {
  createUser: async ({ name, email, username, password }) => {
    const res = await axiosClient.post("/users", { name, email, username, password });
    return res?.data;
  },
  findById: async ({ id }) => {
    const res = await axiosClient.get("/users/find?id=" + id);
    return res?.data;
  },
  findByUsername: async ({ username }) => {
    const res = await axiosClient.get("/users/find?username=" + username);
    return res?.data;
  },
  addFollowing: async ({ userId }) => {
    const res = await axiosClient.post("/users/add-following", { user_id: userId });
    return res?.data;
  },
};

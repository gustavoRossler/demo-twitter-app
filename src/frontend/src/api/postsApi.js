import axiosClient from "./basicClient";

export default {
  getPosts: async ({ authorId, fromUsersFollowing }) => {
    const params = {};
    if (authorId) {
      params["authorId"] = authorId;
    }
    if (fromUsersFollowing) {
      params["fromUsersFollowing"] = fromUsersFollowing;
    }
    const url = "/posts?" + new URLSearchParams(params).toString();
    const res = await axiosClient.get(url);
    return res?.data;
  },
  createPost: async ({ content }) => {
    const res = await axiosClient.post("/posts", { content });
    return res?.data;
  },
};

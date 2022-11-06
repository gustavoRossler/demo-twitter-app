import axiosClient from "./basicClient";

export default {
  getProjects: async () => {
    const res = await axiosClient.get("/projects");
    return res?.data;
  },
  createProject: async ({ name }) => {
    const res = await axiosClient.post("/projects", { name });
    return res?.data;
  },
  deleteProject: async ({ id }) => {
    const res = await axiosClient.delete("/projects/" + id);
    return res?.data;
  },
};

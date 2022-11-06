import axiosClient from "./basicClient";

export default {
  getTasks: async ({ projectId }) => {
    const res = await axiosClient.get("/tasks?projectId=" + projectId);
    return res?.data;
  },
  createTask: async ({ description, projectId }) => {
    const res = await axiosClient.post("/tasks", { description, projectId });
    return res?.data;
  },
  deleteTask: async ({ id }) => {
    const res = await axiosClient.delete("/tasks/" + id);
    return res?.data;
  },
  updateTask: async (task) => {
    const res = await axiosClient.put("/tasks/" + task.id, task);
    return res?.data;
  },
};

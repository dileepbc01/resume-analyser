import { JobRoutes } from "@/types/routes/job.route";

import { api } from "../axios";

export const jobApi = {
  createJob: async (job: JobRoutes["/job"]["post"]["requestBody"]) => {
    const { data } = await api.post<JobRoutes["/job"]["post"]["responses"]>("/job", job);
    return data;
  },

  getAllJobs: async () => {
    const { data } = await api.get<JobRoutes["/job"]["get"]["responses"]>("/job");
    return data;
  },

  getJobById: async (id: string) => {
    const { data } = await api.get<JobRoutes["/job/:id"]["get"]["responses"]>(`/job/${id}`);
    return data;
  },

  updateJob: async (id: string, updates: JobRoutes["/job/:id"]["patch"]["requestBody"]) => {
    const { data } = await api.patch<JobRoutes["/job/:id"]["patch"]["responses"]>(`/job/${id}`, updates);
    return data;
  },
};

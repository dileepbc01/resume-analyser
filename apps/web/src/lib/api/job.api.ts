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
  // updateScoringCriteria: async (jobId: string, criteria: string) => {
  //   const { data } = await api.patch<JobRoutes["/job/:id/scoring-criteria"]["post"]["responses"]>(
  //     `/job/${jobId}/scoring-criteria`,
  //     criteria
  //   );
  //   return data;
  // },
  updateScoringSlider: async (
    jobId: string,
    slider: JobRoutes["/job/:id/scoring-slider"]["patch"]["requestBody"]
  ) => {
    const { data } = await api.patch<JobRoutes["/job/:id/scoring-slider"]["patch"]["responses"]>(
      `/job/${jobId}/scoring-slider`,
      slider
    );
    return data;
  },
  getJobScoringCriteria: async (jobId: string) => {
    const { data } = await api.get<JobRoutes["/job/:id/scoring-criteria"]["get"]["responses"]>(
      `/job/${jobId}/scoring-criteria`
    );
    return data;
  },
};

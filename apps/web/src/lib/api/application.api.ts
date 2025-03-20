import { ApplicationRoutes } from "@/types/routes/application.route";
import { GetApplicationsDto } from "@repo/types";

import { api } from "../axios";

export const applicationApi = {
  uploadResumeFiles: async ({
    form,
    onFileUploadProgress,
  }: {
    form: FormData;
    onFileUploadProgress: (progress: number) => void;
  }) => {
    const { data } = await api.post<ApplicationRoutes["/application/upload"]>("/application/upload", form, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        onFileUploadProgress(percentCompleted);
      },
    });
    return data;
  },
  getApplications: async (dto: GetApplicationsDto) => {
    const { data } = await api.post<ApplicationRoutes["/application"]["get"]["responses"]>(
      `/application`,
      dto
    );
    return data;
  },
};

import { CreateJobDto, GetJobResponse, UpdateJobDto } from "@repo/types";

export interface JobRoutes {
  "/job": {
    post: {
      requestBody: CreateJobDto;
      responses: GetJobResponse;
    };
    get: {
      responses: GetJobResponse[];
    };
  };
  "/job/:id": {
    get: {
      responses: GetJobResponse;
    };
    patch: {
      requestBody: UpdateJobDto;
      responses: GetJobResponse;
    };
  };
}

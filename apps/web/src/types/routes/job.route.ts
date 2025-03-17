import { CreateJobDto, GetJobResponse, UpdateJobDto, UpdateScoringPromptDto } from "@repo/types";
import { GetScoringSettingsResponse } from "@repo/types/src/job/response/get-scoring-settings.response";

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
  "/job/:id/scoring-criteria": {
    post: {
      requestBody: UpdateScoringPromptDto;
      responses: void;
    };
    get: {
      responses: GetScoringSettingsResponse[];
    };
  };
}

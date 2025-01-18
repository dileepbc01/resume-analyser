import { GetApplicationResponse, GetApplicationsDto } from "@repo/types";

// Type for the Auth routes
export type ApplicationRoutes = {
  "/application/upload": {
    post: {
      request: any;
      responses: null;
    };
  };
  "/application": {
    get: {
      request: GetApplicationsDto;
      responses: GetApplicationResponse[];
    };
  };
};

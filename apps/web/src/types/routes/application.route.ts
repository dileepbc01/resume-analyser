import { GetApplicationResponse, GetApplicationsDto } from "@repo/types";

// Type for the Auth routes
export type ApplicationRoutes = {
  "/application/upload": {
    post: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: any;
      responses: null;
    };
  };
  "/application": {
    get: {
      request: GetApplicationsDto;
      responses: GetApplicationResponse;
    };
  };
};

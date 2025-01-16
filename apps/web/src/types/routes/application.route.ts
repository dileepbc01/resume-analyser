// Type for the Auth routes
export type ApplicationRoutes = {
  "/application/upload": {
    post: {
      request: any;
      responses: any;
    };
  };
  "/application": {
    get: {
      request: {
        job_id: string;
      };
      responses: any;
    };
  };
};

import { AuthDto, AuthResponse, CreateRecruiterDto } from "@repo/types";

// Type for the Auth routes
export type AuthRoutes = {
  "/auth/signup": {
    post: {
      requestBody: CreateRecruiterDto;
      responses: AuthResponse;
    };
  };

  "/auth/login": {
    post: {
      requestBody: AuthDto;
      responses: AuthResponse;
    };
  };

  "/auth/logout": {
    get: {
      responses: null;
    };
  };

  "/auth/refresh": {
    get: {
      responses: null;
    };
  };

  "/auth/me": {
    get: {
      responses: AuthResponse;
    };
  };
};

interface AuthResponse {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
}

interface AuthDto {
  email: string;
  password: string;
}

// Type for the request body for /auth/signup
interface CreateRecruiterDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// Type for response of /auth/signup
interface AuthSignupResponse {
  statusCode: number;
  message: string;
  data: AuthResponse;
}

// Type for response of /auth/login
interface AuthLoginResponse {
  statusCode: number;
  message: string;
  data: AuthResponse;
}

// Type for response of /auth/logout
interface AuthLogoutResponse {
  statusCode: number;
  message: string;
}

// Type for response of /auth/refresh
interface AuthRefreshResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}


// Type for the Auth routes
export type AuthRoutes = {
  '/auth/signup': {
    post: {
      requestBody: CreateRecruiterDto;
      responses: AuthSignupResponse;
    };
  };
  
  '/auth/login': {
    post: {
      requestBody: AuthDto;
      responses: AuthLoginResponse;
    };
  };

  '/auth/logout': {
    get: {
      responses: AuthLogoutResponse;
    };
  };

  '/auth/refresh': {
    get: {
      responses: AuthRefreshResponse;
    };
  };

  '/auth/me': {
    get: {
      responses: AuthResponse;
    };
  };
};

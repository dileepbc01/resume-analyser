import { AuthRoutes } from "@/types/routes/auth.route";

import { api } from "../axios";

export const authApi = {
  login: async (credentials: AuthRoutes["/auth/login"]["post"]["requestBody"]) => {
    const resp = await api.post<AuthRoutes["/auth/login"]["post"]["responses"]>("/auth/login", credentials);
    return resp;
  },

  logout: async () => {
    await api.get<AuthRoutes["/auth/logout"]["get"]["responses"]>("/auth/logout");
  },

  getMe: async () => {
    const { data } = await api.get<AuthRoutes["/auth/me"]["get"]["responses"]>("/auth/me", {
      withCredentials: true,
    });
    return data;
  },

  signup: async (recruiter: AuthRoutes["/auth/signup"]["post"]["requestBody"]) => {
    const { data } = await api.post<AuthRoutes["/auth/signup"]["post"]["responses"]>("/auth/signup", {
      ...recruiter,
    });
    return data;
  },
};

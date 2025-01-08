import { LoginCredentials, Recruiter } from '@/types/auth';
import { axiosInstance } from '../axios';
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post<{ user: Recruiter }>(
      '/auth/login',
      credentials
    );
    return data;
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout');
  },

  getMe: async () => {
    const { data } = await axiosInstance.get<Recruiter>('/auth/me');
    return data;
  },
};

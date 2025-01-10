/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface CustomAxiosError extends AxiosError {
  response: {
    data: {
      message: string;
      statusCode: number;
      error:string
    };
    status: number;
    statusText: string;
    headers: any;
    config: any;
  };
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

// Queue interface
interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};


// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => axios(originalRequest));
      }

    isRefreshing = true;
    originalRequest._retry = true;

      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,{
          withCredentials: true,
        });
        processQueue(null);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

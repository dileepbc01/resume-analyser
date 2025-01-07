declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGO_URI: string;
      JWT_REFRESH_SECRET: string;
      JWT_EXPIRE: string;
    }
  }
}

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      MONGO_URI: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      REDIS_URL: string;
      ANTHROPIC_API_KEY: string;
    }
  }
}

export {};

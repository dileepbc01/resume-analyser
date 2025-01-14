declare namespace NodeJS {
  interface ProcessEnv {
    // Server
    NODE_ENV: "development" | "production" | "test";
    // App specific
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_API_URL: string;
  }
}

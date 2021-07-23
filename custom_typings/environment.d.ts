declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      SPDC_COOKIE: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};

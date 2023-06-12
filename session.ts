import expressSession from "express-session";

export const sessionMiddleware =  expressSession({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
});

declare module "express-session" {
    interface SessionData {
      isLogin?: boolean;
      userId?: string;
        
    }
  }
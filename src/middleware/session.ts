import RedisStore from "connect-redis";
import { createClient } from "redis";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL!,
});
redisClient.on("connect", function () {
  console.log(`Redis client connected`);
});
redisClient.on("error", function (err) {
  console.log(`Redis client error: ${err.message}`, err);
});

redisClient.connect();

export const redisStorePrefix = "aifansapp:";

const sessionMiddleware = session({
  store: new RedisStore({
    client: redisClient,
    prefix: redisStorePrefix,
    ttl: 1000,
  }),
  secret: process.env.SESSION_SECRET!,
  name: "aifansSessionId",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  },
  resave: true,
  saveUninitialized: false,
});

export default sessionMiddleware;

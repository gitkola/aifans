import { NextApiResponse } from "next";
import type { NextApiRequest } from "next/types";
import { createRouter } from "next-connect";
import { passportAuth, passportInitialize, passportSession } from "./passport";
import sessionMiddleware from "./session";

const wrap =
  (middleware: any) =>
  (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => {
    middleware(req, res, next);
  };

const authMiddleware = createRouter<NextApiRequest, NextApiResponse>();

authMiddleware.use(wrap(sessionMiddleware));
authMiddleware.use(wrap(passportInitialize));
authMiddleware.use(wrap(passportSession));
authMiddleware.use(wrap(passportAuth));

export default authMiddleware;

"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { deleteCookie } from "cookies-next";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.post((req, res, next) => {
  try {
    deleteCookie("aifansSessionId", { req, res });
    res.status(200).json({ message: "Logout success." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
});
export default router.handler({
  onError: (err, req, res) => {
    console.error((err as Error).message);
    res
      .status((err as { statusCode: number | undefined }).statusCode || 500)
      .end((err as Error).message);
  },
});

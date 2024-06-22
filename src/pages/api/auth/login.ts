import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import authMiddleware from "@/middleware/authMiddleware";

const router = createRouter<NextApiRequest, NextApiResponse>();
router.use(authMiddleware);
router.post((req, res) => {
  const user = (req as any).user;
  res.status(200).json({ user, message: "Login success." });
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(`api/auth/login error:`, err);
    res
      .status((err as { statusCode: number | undefined }).statusCode || 500)
      .end((err as Error).message);
  },
});

export const config = {
  api: {
    externalResolver: true,
  },
};

// export const config = {
//   runtime: "edge",
// };

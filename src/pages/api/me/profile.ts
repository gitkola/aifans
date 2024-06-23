import { User } from "@/db/models";
import { IUser } from "@/types";
import getSessionFromStore from "@/utils/getSessionFromStore";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  user?: IUser;
};

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const aifansSessionId = req?.cookies["aifansSessionId"];
  if (typeof aifansSessionId !== "string") {
    return res.status(400).json({ message: "Invalid request" });
  }
  const session = await getSessionFromStore(aifansSessionId);
  if (!session) throw new Error();
  const userId = session.passport?.user;
  if (typeof userId !== "string") throw new Error();
  const user = await User.findByPk(userId);
  if (!user) throw new Error();
  res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
}

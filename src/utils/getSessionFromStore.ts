import { redisClient, redisStorePrefix } from "@/middleware/session";
import extractRedisId from "./extractRedisId";
import { ISessionData } from "@/types";

export default async function getSessionFromStore(
  id: string
): Promise<ISessionData | null> {
  if (typeof id !== "string") return null;
  const redisId = extractRedisId(id);
  if (typeof redisId !== "string") return null;
  const session = await redisClient.get(redisStorePrefix + redisId);
  if (typeof session !== "string") return null;
  return JSON.parse(session);
}

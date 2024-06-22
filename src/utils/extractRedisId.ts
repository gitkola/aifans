export default function extractRedisId(sessionId: string): string | null {
  const match = sessionId.match(/^s:(.+?)\./);
  return match ? match[1] : null;
}

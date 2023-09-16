const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://undefined`;
  return "http://localhost:3000";
};

export const getUrl = (): string => getBaseUrl() + "/api/trpc";

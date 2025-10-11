import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const BASE_PATH = isProd ? "/octopus" : undefined;
const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty"],
  output: "standalone",
  basePath: BASE_PATH,
};
export default nextConfig;

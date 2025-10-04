import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";
const BASE_PATH = isProd ? "/octopus" : undefined;

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: BASE_PATH,
};

export default nextConfig;

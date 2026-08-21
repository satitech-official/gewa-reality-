import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "gewa-reality-";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  images: isGitHubPages
    ? {
        unoptimized: true,
      }
    : {
        remotePatterns: [{ protocol: "https", hostname: "**" }],
      },
};

export default nextConfig;

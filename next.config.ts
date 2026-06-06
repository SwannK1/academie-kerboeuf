import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/.git/**",
          "**/node_modules/**",
          "**/.next/**",
          "**/.next-*/**",
        ],
      };
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/professeurs/felix",
        destination: "/personnages/felix",
        permanent: true,
      },
      {
        source: "/primaire/elementaire",
        destination: "/primaire/lieux",
        permanent: true,
      },
      {
        source: "/primaire/elementaire/lieux/:slug*",
        destination: "/primaire/lieux",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

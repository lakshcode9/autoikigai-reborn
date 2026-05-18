import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.autoikigai.space" }],
        destination: "https://autoikigai.space/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

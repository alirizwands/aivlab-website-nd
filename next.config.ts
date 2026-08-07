import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Vinext classifies multipart POST requests as progressive actions before
    // dispatching route handlers, so this must exceed the 5 MB CV limit plus
    // multipart form overhead.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;

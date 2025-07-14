/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http", // Permite http
        hostname: "**", // Permite cualquier hostname
        port: "", // Permite cualquier puerto
        pathname: "**", // Permite cualquier path
      },
      {
        protocol: "https", // Permite https
        hostname: "**", // Permite cualquier hostname
        port: "", // Permite cualquier puerto
        pathname: "**", // Permite cualquier path
      },
    ],
  },
};

export default nextConfig;

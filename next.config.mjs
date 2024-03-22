/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "https://transfermarkt-api.vercel.app/:path*",
          },
        ];
       },
};

export default nextConfig;

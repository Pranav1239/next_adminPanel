/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ["lh3.googleusercontent.com" , "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

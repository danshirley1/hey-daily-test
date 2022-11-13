/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "thispersondoesnotexist.com",
                port: "",
                pathname: "/image",
            },
        ],
    },
};

module.exports = nextConfig;

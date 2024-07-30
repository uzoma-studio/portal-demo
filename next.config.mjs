/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STRAPI_ACCESS_TOKEN: process.env.STRAPI_ACCESS_TOKEN,
        STRAPI_URL: process.env.STRAPI_URL,
        APP_ENV: process.env.APP_ENV,
        GOOGLE_DRIVE_API_KEY: process.env.GOOGLE_DRIVE_API_KEY
    },
};

export default nextConfig;

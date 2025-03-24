import { withPayload } from "@payloadcms/next/withPayload";
import dotenv from 'dotenv';
dotenv.config();
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URI: process.env.DATABASE_URI,
        PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
        GOOGLE_DRIVE_API_KEY: process.env.GOOGLE_DRIVE_API_KEY
    },
};

export default withPayload(nextConfig);

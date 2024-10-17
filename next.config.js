const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "firebasestorage.googleapis.com",
      "utfs.io",
      "dev-to-uploads.s3.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
  swcMinify: true,

  env: {
    APIKEY: process.env.APIKEY,
    APP_ID: process.env.APP_ID,
    BASEURL: process.env.BASEURL,
    BGDATAURL: process.env.BGDATAURL,
    BIGDATACLOUDKEY: process.env.BIGDATACLOUDKEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    DB_URI: process.env.DB_URI,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    FRONTENDURL: process.env.FRONTENDURL,
    GOOGLE_AUTH_API_KEY: process.env.GOOGLE_AUTH_API_KEY,
    JWT_ALGORITHM: process.env.JWT_ALGORITHM,
    JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    MESSAGING_ID: process.env.MESSAGING_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    images: {
      domains: ['images.unsplash.com','source.unsplash.com',"firebasestorage.googleapis.com",'utfs.io'],
    },
    swcMinify: true,

}

  
module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL
  },
  // async rewrites() {
  //   return process.env.NODE_ENV === 'development'
  //     ? [
  //         // ローカル開発時のproxy設定
  //         {
  //           source: '/:path*',
  //           destination: 'https://api.test.local/:path*',
  //           // source: '/',
  //           // destination: 'https://localhost:8080/:path*',
  //         },
  //     ] : []
  // }
}

module.exports = nextConfig

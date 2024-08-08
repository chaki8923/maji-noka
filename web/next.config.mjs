/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // X(Twitter)とGoogleのプロフィール画像を表示するために追加
    domains: ["pbs.twimg.com", "lh3.googleusercontent.com", "https://maji-image.s3.ap-northeast-1.amazonaws.com", "maji-image.s3.ap-northeast-1.amazonaws.com"],
  },
  distDir: '.next'
};

export default nextConfig;

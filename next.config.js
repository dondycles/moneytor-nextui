/** @type {import('next').NextConfig} */
const nextConfig = {};
const withWorkbox = require("next-with-workbox");
module.exports = withWorkbox({
  workbox: {
    swSrc: "worker.ts",
  },
  nextConfig,
});

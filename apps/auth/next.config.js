/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
};

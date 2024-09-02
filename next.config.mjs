/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co", "res.cloudinary.com", "img.freepik.com"], // Add any other domains you need here
    dangerouslyAllowSVG: true,  // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const RESUME = "/SriHarshitha_Anugu_Resume.pdf";

const nextConfig = {
  reactStrictMode: true,

  // Friendly aliases so a shared /resume link never 404s.
  async redirects() {
    return [
      { source: "/resume", destination: RESUME, permanent: false },
      { source: "/cv", destination: RESUME, permanent: false },
      { source: "/resume.pdf", destination: RESUME, permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          // Open in the browser's viewer rather than forcing a download
          { key: "Content-Disposition", value: "inline" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;

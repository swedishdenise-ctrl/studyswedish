import type { NextConfig } from "next";

// studyswedish.com is now a pure storefront (fridge magnets only). The course,
// free content pages, dashboard, and coaching are hidden — not deleted — via
// redirect to the homepage. Remove a rule here to bring a section back.
const HIDDEN_PATHS = [
  "/about",
  "/coaching",
  "/conversagas",
  "/course",
  "/mediakit",
  "/pricing",
  "/blog",
  "/daily-word",
  "/phrases",
];

const HIDDEN_PREFIXES = ["/community", "/grammar", "/recipes", "/verbs", "/vocabulary", "/learn"];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
  },
  async redirects() {
    return [
      // The storefront now lives at "/" — old product links keep working.
      { source: "/magnets", destination: "/", permanent: false },
      { source: "/shop", destination: "/", permanent: false },
      { source: "/dashboard", destination: "/", permanent: false },
      ...HIDDEN_PATHS.map((source) => ({ source, destination: "/", permanent: false })),
      ...HIDDEN_PREFIXES.map((prefix) => ({
        source: `${prefix}/:path*`,
        destination: "/",
        permanent: false,
      })),
      ...HIDDEN_PREFIXES.map((prefix) => ({
        source: prefix,
        destination: "/",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;

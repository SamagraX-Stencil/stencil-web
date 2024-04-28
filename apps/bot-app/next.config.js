/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
    env: {
      NEXT_PUBLIC_ENV: 'PRODUCTION', // your next configs go here
    },
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true,    
    },
    compiler: {
      removeConsole:  true
    },
    i18n: {
      locales: ['en'], // add more lang codes if support added
      defaultLocale: 'en',
    },
  })
);

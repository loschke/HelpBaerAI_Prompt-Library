/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXTAUTH_URL || 'https://promptbaer.de',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/auth/*',      // Authentifizierungsrouten
    '/api/*',       // API Endpunkte
    '/premium/*',   // Premium Bereich
  ],
}
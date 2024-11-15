import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://promptbaer.de',
  generateRobotsTxt: false, // We already have a custom robots.txt
  exclude: ['/auth/*', '/api/*'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  outDir: 'public',
};

export default config;

import fs from 'fs';
import path from 'path';

// Inline simple generator to avoid TS compilation issues in script
class SitemapGenerator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.entries = [];
  }

  generate() {
    // Static routes from App.tsx
    const routes = [
      '',
      '/about',
      '/work',
      '/articles',
      '/contact',
      '/developer',
      '/services'
    ];

    routes.forEach(route => {
      this.addUrl(route);
    });

    // Note: To add dynamic routes (projects/articles), we would need to read the FS here.
    // For this fix, we are ensuring the script runs successfully with core pages.

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.entries.join('')}
</urlset>`;
  }

  addUrl(route) {
    this.entries.push(`
  <url>
    <loc>${this.baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`);
  }
}

async function generateSitemap() {
  // Use VITE_SITE_URL from env if available (loaded via dotenv or process.env)
  // Since we are not using dotenv package here explicitly, we rely on Node 20+ --env-file if passed,
  // or default to hardcoded.
  // The user script did: "node scripts/generate-sitemap.js", no .env loading flagged unless user adds it.

  // Basic .env parser since 'dotenv' might not be loaded in simple node script
  let envUrl = process.env.VITE_SITE_URL;
  if (!envUrl) {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/VITE_SITE_URL=["']?([^"'\n]+)["']?/);
        if (match) envUrl = match[1];
      }
    } catch (e) { }
  }

  const baseUrl = envUrl || 'https://himanshu-salunke.vercel.app';
  console.log(`Using Base URL: ${baseUrl}`);

  const generator = new SitemapGenerator(baseUrl);

  try {
    const sitemap = generator.generate();
    const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

    // Ensure public directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
      fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
    }

    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
    console.log(`📊 Generated ${generator.entries.length} URLs`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();

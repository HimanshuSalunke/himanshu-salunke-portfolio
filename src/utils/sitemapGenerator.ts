export class SitemapGenerator {
    baseUrl: string;
    entries: string[];

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.entries = [];
    }

    generateFromContent(): string {
        // Static routes
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
            this.entries.push(`
  <url>
    <loc>${this.baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`);
        });

        // TODO: Add dynamic content (projects, articles) scanning here if needed.
        // For now, we are returning the basic structure to get the script running.

        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.entries.join('')}
</urlset>`;
    }
}

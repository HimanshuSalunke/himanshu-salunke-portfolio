import { SITE_CONFIG } from '../config/site';

const siteConfig = {
  name: SITE_CONFIG.name,
  author: SITE_CONFIG.author,
  url: SITE_CONFIG.url,
  themeColor: SITE_CONFIG.themeColor,
  keywords: [SITE_CONFIG.description],
  social: {
    twitter: SITE_CONFIG.twitterHandle.replace(/^@/, ''),
  },
} as const;

interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

export class MetaGenerator {
  static generateMetaTags(options: MetaTags): Record<string, string> {
    const {
      title,
      description,
      keywords,
      author = siteConfig.author,
      ogTitle = title,
      ogDescription = description,
      ogImage = `${siteConfig.url}/og/default.png`,
      ogUrl,
      ogType = 'website',
      twitterCard = 'summary_large_image',
      twitterTitle = ogTitle,
      twitterDescription = ogDescription,
      twitterImage = ogImage,
      canonical,
      robots = 'index, follow'
    } = options;

    const fullOgUrl = ogUrl || `${siteConfig.url}${canonical || ''}`;
    const fullCanonical = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;

    return {
      // Basic meta tags
      title: `${title} | ${siteConfig.name}`,
      description,
      keywords: keywords || siteConfig.keywords.join(', '),
      author,
      robots,

      // Open Graph tags
      'og:title': ogTitle,
      'og:description': ogDescription,
      'og:image': ogImage,
      'og:url': fullOgUrl,
      'og:type': ogType,
      'og:site_name': siteConfig.name,
      'og:locale': 'en_US',

      // Twitter Card tags
      'twitter:card': twitterCard,
      'twitter:title': twitterTitle,
      'twitter:description': twitterDescription,
      'twitter:image': twitterImage,
      'twitter:creator': `@${siteConfig.social.twitter}`,
      'twitter:site': `@${siteConfig.social.twitter}`,

      // Additional meta tags
      'theme-color': siteConfig.themeColor,
      'msapplication-TileColor': siteConfig.themeColor,
      'viewport': 'width=device-width, initial-scale=1.0',

      // Canonical URL
      'canonical': fullCanonical,

      // Additional SEO
      'language': 'en',
      'revisit-after': '7 days',
      'distribution': 'global',
      'rating': 'general'
    };
  }

  static generateArticleMeta(article: {
    title: string;
    description: string;
    slug: string;
    date: string;
    author?: string;
    tags?: string[];
    ogImage?: string;
  }) {
    return this.generateMetaTags({
      title: article.title,
      description: article.description,
      keywords: article.tags?.join(', '),
      author: article.author,
      ogTitle: article.title,
      ogDescription: article.description,
      ogImage: article.ogImage || `${siteConfig.url}/og/${article.slug}.png`,
      ogUrl: `${siteConfig.url}/article/${article.slug}`,
      ogType: 'article',
      canonical: `/article/${article.slug}`,
      robots: 'index, follow'
    });
  }

  static generateProjectMeta(project: {
    title: string;
    description: string;
    slug: string;
    date: string;
    author?: string;
    technologies?: string[];
    ogImage?: string;
  }) {
    return this.generateMetaTags({
      title: project.title,
      description: project.description,
      keywords: project.technologies?.join(', '),
      author: project.author,
      ogTitle: project.title,
      ogDescription: project.description,
      ogImage: project.ogImage || `${siteConfig.url}/api/og/${project.slug}?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.description)}&type=project&date=${project.date}&tags=${encodeURIComponent(project.technologies?.join(',') || '')}`,
      ogUrl: `${siteConfig.url}/work/${project.slug}`,
      ogType: 'article',
      canonical: `/work/${project.slug}`,
      robots: 'index, follow'
    });
  }

  static generatePageMeta(page: {
    title: string;
    description: string;
    path: string;
    ogImage?: string;
  }) {
    return this.generateMetaTags({
      title: page.title,
      description: page.description,
      ogTitle: page.title,
      ogDescription: page.description,
      ogImage: page.ogImage || `${siteConfig.url}/api/og/page?title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}&type=website`,
      ogUrl: `${siteConfig.url}${page.path}`,
      ogType: 'website',
      canonical: page.path,
      robots: 'index, follow'
    });
  }
}

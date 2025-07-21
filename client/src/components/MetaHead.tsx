import { useEffect } from 'react';

interface MetaHeadProps {
  title?: string;
  description?: string;
  author?: string;
  publishedAt?: string;
  readingTime?: number;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  tags?: string[];
}

export function MetaHead({ 
  title, 
  description, 
  author,
  publishedAt,
  readingTime,
  image,
  url,
  type = 'article',
  tags 
}: MetaHeadProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | 26weeks.ai - Your AI Marathon Coach`;
    } else {
      document.title = '26weeks.ai - Your AI Marathon Coach';
    }
    
    // Clear existing JSON-LD structured data
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description);
    }

    if (author) {
      updateMetaTag('author', author);
    }

    if (tags && tags.length > 0) {
      updateMetaTag('keywords', tags.join(', '));
    }

    // Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, true);
    }
    
    if (description) {
      updateMetaTag('og:description', description, true);
    }
    
    updateMetaTag('og:type', type, true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }
    
    // Use provided image or default to the 26weeks.ai banner
    const baseImageUrl = image || (typeof window !== 'undefined' ? `${window.location.origin}/banner-social.svg` : 'https://26weeks.ai/banner-social.svg');
    // Add timestamp to force refresh for social media crawlers
    const ogImage = `${baseImageUrl}?v=${Date.now()}`;
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:type', 'image/svg+xml', true);
    updateMetaTag('og:image:alt', title || '26weeks.ai - Your AI Marathon Coach', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@26weeksai');
    updateMetaTag('twitter:creator', '@26weeksai');
    
    if (title) {
      updateMetaTag('twitter:title', title);
    }
    
    if (description) {
      updateMetaTag('twitter:description', description);
    }
    
    // Use the same image as OG
    updateMetaTag('twitter:image', ogImage);
    
    // Add site name
    updateMetaTag('og:site_name', '26weeks.ai', true);

    // Article specific meta tags
    if (type === 'article') {
      if (publishedAt) {
        updateMetaTag('article:published_time', publishedAt, true);
      }
      
      if (author) {
        updateMetaTag('article:author', author, true);
      }
      
      if (tags) {
        // Remove existing article:tag meta tags
        const existingTags = document.querySelectorAll('meta[property="article:tag"]');
        existingTags.forEach(tag => tag.remove());
        
        // Add new tags
        tags.forEach(tag => {
          updateMetaTag('article:tag', tag, true);
        });
      }

      if (readingTime) {
        updateMetaTag('twitter:label1', 'Reading time');
        updateMetaTag('twitter:data1', `${readingTime} min read`);
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    if (url) {
      canonical.setAttribute('href', url);
    }

    // JSON-LD structured data for articles
    if (type === 'article' && title && description && author && publishedAt) {
      let jsonLd = document.querySelector('script[type="application/ld+json"]');
      if (!jsonLd) {
        jsonLd = document.createElement('script');
        jsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLd);
      }
      
      const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        author: {
          '@type': 'Person',
          name: author
        },
        datePublished: publishedAt,
        publisher: {
          '@type': 'Organization',
          name: '26weeks.ai',
          logo: {
            '@type': 'ImageObject',
            url: 'https://26weeks.ai/icon-corners.svg'
          }
        }
      };
      
      if (image) {
        structuredData.image = image;
      }
      
      if (url) {
        structuredData.url = url;
      }
      
      if (readingTime) {
        structuredData.timeRequired = `PT${readingTime}M`;
      }
      
      jsonLd.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, author, publishedAt, readingTime, image, url, type, tags]);

  return null; // This component doesn't render anything
}
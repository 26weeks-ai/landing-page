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
  tags?: readonly string[];
  aiSummary?: readonly string[];
  noIndex?: boolean;
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
  tags,
  aiSummary,
  noIndex = false,
}: MetaHeadProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | 26weeks.ai - Your AI Marathon Coach`;
    } else {
      document.title = '26weeks.ai - Your AI Marathon Coach';
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
      if (content) {
        meta.setAttribute('content', content);
      }
    };

    const removeMetaTag = (name: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      document.querySelectorAll(selector).forEach((meta) => meta.remove());
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

    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('og:locale', 'en_US', true);

    if (aiSummary && aiSummary.length > 0) {
      updateMetaTag('ai-summary', aiSummary.join(' | '));
    } else {
      removeMetaTag('ai-summary');
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
    
    const origin = typeof window !== "undefined" ? window.location.origin : "https://26weeks.ai";
    const toAbsoluteUrl = (maybeUrl: string) => {
      if (!maybeUrl) return maybeUrl;
      if (/^(https?:)?\/\//i.test(maybeUrl) || maybeUrl.startsWith("data:")) return maybeUrl;
      if (maybeUrl.startsWith("/")) return `${origin}${maybeUrl}`;
      return `${origin}/${maybeUrl}`;
    };

    const inferImageType = (imageUrl: string) => {
      const normalized = imageUrl.split("#")[0]?.split("?")[0]?.toLowerCase() ?? "";
      if (normalized.endsWith(".png")) return "image/png";
      if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
      if (normalized.endsWith(".webp")) return "image/webp";
      if (normalized.endsWith(".svg")) return "image/svg+xml";
      return undefined;
    };

    // Use provided image or default to the 26weeks.ai banner.
    const baseImageUrl = image ? toAbsoluteUrl(image) : `${origin}/banner-social.png`;
    const ogImage = baseImageUrl;
    const ogImageType = inferImageType(ogImage);
    updateMetaTag('og:image', ogImage, true);
    if (ogImageType) {
      updateMetaTag("og:image:type", ogImageType, true);
    } else {
      removeMetaTag("og:image:type", true);
    }

    const shouldSetOgDimensions = /\/(banner-social|og-image)\.(png|jpg|jpeg|webp|svg)$/i.test(
      ogImage.split("#")[0]?.split("?")[0] ?? "",
    );
    if (shouldSetOgDimensions) {
      updateMetaTag("og:image:width", "1200", true);
      updateMetaTag("og:image:height", "630", true);
    } else {
      removeMetaTag("og:image:width", true);
      removeMetaTag("og:image:height", true);
    }
    updateMetaTag('og:image:alt', title || '26weeks.ai - Your AI Marathon Coach', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag("twitter:site", "@26weeks_ai");
    updateMetaTag("twitter:creator", "@26weeks_ai");
    
    if (title) {
      updateMetaTag('twitter:title', title);
    }
    
    if (description) {
      updateMetaTag('twitter:description', description);
    }
    
    // Use the same image as OG
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', title || '26weeks.ai - Your AI Marathon Coach');
    
    // Add site name
    updateMetaTag('og:site_name', '26weeks.ai', true);

    if (type !== 'article') {
      removeMetaTag('article:published_time', true);
      removeMetaTag('article:author', true);
      removeMetaTag('twitter:label1');
      removeMetaTag('twitter:data1');
      removeMetaTag('article:tag', true);
    }

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
      const existingJsonLd = document.querySelector('script[data-meta-head="article"]');
      if (existingJsonLd) {
        existingJsonLd.remove();
      }

      const jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      jsonLd.setAttribute('data-meta-head', 'article');
      document.head.appendChild(jsonLd);
      
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

  }, [title, description, author, publishedAt, readingTime, image, url, type, tags, aiSummary, noIndex]);

  return null; // This component doesn't render anything
}

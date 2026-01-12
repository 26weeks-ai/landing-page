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
    const defaultTitle = '26weeks.ai - Your AI Marathon Coach';
    const ogTitle = title?.trim() ? title : defaultTitle;

    // Update document title
    if (title) {
      document.title = `${title} | 26weeks.ai - Your AI Marathon Coach`;
    } else {
      document.title = defaultTitle;
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

    const removeMetaTag = (name: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      document.querySelectorAll(selector).forEach((meta) => meta.remove());
    };

    const setMetaTag = (name: string, content: string | undefined, property?: boolean) => {
      const trimmed = content?.trim();
      if (!trimmed) {
        removeMetaTag(name, property);
        return;
      }
      updateMetaTag(name, trimmed, property);
    };

    const setMultiMetaTags = (
      name: string,
      values: readonly string[] | undefined,
      property?: boolean,
    ) => {
      removeMetaTag(name, property);
      (values ?? [])
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => {
          const meta = document.createElement('meta');
          if (property) {
            meta.setAttribute('property', name);
          } else {
            meta.setAttribute('name', name);
          }
          meta.setAttribute('content', value);
          document.head.appendChild(meta);
        });
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://26weeks.ai';
    const toAbsoluteUrl = (maybeUrl: string) => {
      if (!maybeUrl) return maybeUrl;
      if (/^(https?:)?\/\//i.test(maybeUrl) || maybeUrl.startsWith('data:')) return maybeUrl;
      if (maybeUrl.startsWith('/')) return `${origin}${maybeUrl}`;
      return `${origin}/${maybeUrl}`;
    };

    const fallbackCanonicalUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}${window.location.search}`
        : undefined;

    const canonicalUrl = url ? toAbsoluteUrl(url) : fallbackCanonicalUrl;

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('author', author);
    setMetaTag('keywords', tags && tags.length > 0 ? tags.join(', ') : undefined);

    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('og:locale', 'en_US', true);

    setMetaTag('ai-summary', aiSummary && aiSummary.length > 0 ? aiSummary.join(' | ') : undefined);

    // Open Graph tags
    updateMetaTag('og:title', ogTitle, true);
    setMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    setMetaTag('og:url', canonicalUrl, true);

    const inferImageType = (imageUrl: string) => {
      const normalized = imageUrl.split("#")[0]?.split("?")[0]?.toLowerCase() ?? "";
      if (normalized.endsWith(".png")) return "image/png";
      if (normalized.endsWith(".jpg") || normalized.endsWith(".jpeg")) return "image/jpeg";
      if (normalized.endsWith(".webp")) return "image/webp";
      if (normalized.endsWith(".svg")) return "image/svg+xml";
      return undefined;
    };

    // Use provided image or default to the 26weeks.ai OG image.
    const baseImageUrl = image ? toAbsoluteUrl(image) : `${origin}/og-image.png`;
    const ogImage = baseImageUrl;
    const ogImageType = inferImageType(ogImage);
    updateMetaTag('og:image', ogImage, true);
    if (ogImage.startsWith('https://')) {
      updateMetaTag('og:image:secure_url', ogImage, true);
    } else {
      removeMetaTag('og:image:secure_url', true);
    }
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
    setMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:title', ogTitle);
    setMetaTag('twitter:description', description);
    
    // Use the same image as OG
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', ogTitle);
    
    // Add site name
    updateMetaTag('og:site_name', '26weeks.ai', true);

    const existingArticleJsonLd = document.querySelectorAll('script[data-meta-head="article"]');
    existingArticleJsonLd.forEach((node) => node.remove());

    if (type !== 'article') {
      removeMetaTag('article:published_time', true);
      removeMetaTag('article:author', true);
      removeMetaTag('twitter:label1');
      removeMetaTag('twitter:data1');
      removeMetaTag('article:tag', true);
    }

    // Article specific meta tags
    if (type === 'article') {
      setMetaTag('article:published_time', publishedAt, true);
      setMetaTag('article:author', author, true);
      setMultiMetaTags('article:tag', tags, true);

      if (readingTime) {
        updateMetaTag('twitter:label1', 'Reading time');
        updateMetaTag('twitter:data1', `${readingTime} min read`);
      } else {
        removeMetaTag('twitter:label1');
        removeMetaTag('twitter:data1');
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    if (canonicalUrl) {
      canonical.setAttribute('href', canonicalUrl);
    }

    // JSON-LD structured data for articles
    if (type === 'article' && title && description && author && publishedAt && canonicalUrl) {
      const jsonLd = document.createElement('script');
      jsonLd.setAttribute('type', 'application/ld+json');
      jsonLd.setAttribute('data-meta-head', 'article');
      document.head.appendChild(jsonLd);
      
      const structuredData: any = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: description,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
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
            url: `${origin}/android-chrome-512x512.png`,
          }
        }
      };
      
      structuredData.image = ogImage;
      structuredData.url = canonicalUrl;
      
      if (readingTime) {
        structuredData.timeRequired = `PT${readingTime}M`;
      }
      
      jsonLd.textContent = JSON.stringify(structuredData);
    }

  }, [title, description, author, publishedAt, readingTime, image, url, type, tags, aiSummary, noIndex]);

  return null; // This component doesn't render anything
}

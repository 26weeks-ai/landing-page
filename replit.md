# 26weeks.ai - AI-Powered Marathon Training Platform

## Project Overview

A comprehensive running and marathon training platform featuring:
- React frontend with Vite and TypeScript
- Express.js backend with PostgreSQL database
- AI-powered training personalization (planned)
- Full-featured blog system with markdown support
- Responsive design optimized for mobile and desktop

## Recent Changes

✓ **Blog Social Sharing & Metadata** (July 21, 2025)
- Implemented server-side metadata injection for social media sharing
- Added middleware to detect social media crawlers and serve dynamic metadata
- Blog posts now show correct title and description when shared on social platforms
- Integrated 26weeks.ai logo for all shared blog content
- Added proper Open Graph and Twitter Card tags for each blog post
- Performance optimizations with lazy loading and improved caching

✓ **Blog System Implementation** (July 21, 2025)
- Added complete blog functionality with markdown support
- Database schema for blog posts with tags, featured posts, and search
- Social sharing buttons for Twitter, Facebook, LinkedIn, and email
- Search and filter capabilities by tags and content
- Responsive blog listing and individual post pages
- Automatic markdown file loading from content/blog directory
- Added blog navigation to main site header

✓ **Blog Features**
- Markdown parsing with syntax highlighting
- Social media sharing integration
- Featured posts section
- Tag-based filtering and search
- Reading time calculation
- SEO-friendly URLs with slugs
- Related posts suggestions

## Project Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with shadcn/ui components
- **Framer Motion** for animations
- **React Markdown** with syntax highlighting

### Backend Stack
- **Express.js** with TypeScript
- **PostgreSQL** database with Drizzle ORM
- **Drizzle Kit** for database migrations
- **Gray Matter** for markdown frontmatter parsing
- RESTful API design

### Database Schema
- `users` - User authentication and profiles
- `waitlist` - Early access signups
- `subscribers` - Newsletter subscriptions
- `blog_posts` - Blog content with markdown support

### Blog System Details
- **Content Management**: Markdown files in `content/blog/` directory
- **Auto-loading**: Server automatically reads and syncs markdown files to database
- **Search**: Full-text search across titles, excerpts, and content
- **Social Sharing**: Pre-built sharing URLs for major platforms
- **Performance**: Lazy-loaded components and optimized queries

## File Structure

```
├── client/src/
│   ├── components/
│   │   ├── blog/          # Blog-specific components
│   │   ├── layout/        # Navigation and layout
│   │   ├── sections/      # Home page sections
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   ├── pages/            # Page components including blog
│   └── hooks/            # Custom React hooks
├── server/
│   ├── utils/            # Server utilities including blog loader
│   ├── routes.ts         # API endpoints
│   ├── storage.ts        # Database operations
│   └── index.ts          # Server entry point
├── shared/
│   └── schema.ts         # Database schema and types
└── content/blog/         # Markdown blog posts
```

## API Endpoints

### Blog API
- `GET /api/blog` - List all blog posts
- `GET /api/blog/featured` - Get featured posts
- `GET /api/blog/search?q=query` - Search posts
- `GET /api/blog/:slug` - Get specific post
- `POST /api/blog` - Create new post (admin)

### Other APIs
- `POST /api/waitlist` - Join waitlist
- `POST /api/subscribe` - Newsletter subscription

## User Preferences

*No specific user preferences documented yet*

## Development Notes

### Blog Content Management
- Add new blog posts by creating `.md` files in `content/blog/`
- Required frontmatter: title, excerpt, author, publishedAt, tags, readingTime, featured
- Server automatically syncs markdown files to database on startup
- Supports syntax highlighting and GitHub Flavored Markdown

### Design System
- Orange/amber color scheme (#f97316 primary)
- Dark themed header with gradient backgrounds
- Mobile-first responsive design
- Consistent spacing and typography

### Performance Optimizations
- Lazy loading of page components
- Skeleton loading states
- Image optimization and proper alt texts
- Minimal bundle size with tree shaking

## Deployment

- Uses Replit Deployments for hosting
- Environment variables managed through Replit secrets
- PostgreSQL database included
- Static assets served efficiently
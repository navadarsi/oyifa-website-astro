# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Oyifa marketing website**, a bilingual (English/Arabic) static site built with Astro SSG and Tailwind CSS v4. The site integrates with Sanity CMS for blog content management and supports i18n routing for English (default) and Arabic with RTL support.

Oyifa is an IT procurement platform for the GCC region that connects businesses with qualified vendors, positioning itself as a solution to broken IT procurement processes.

## Development Commands

All commands are run from the repository root:

- **Development server**: `npm run dev` (starts at `localhost:4321`)
- **Build for production**: `npm run build` (outputs to `./dist/`)
- **Preview production build**: `npm run preview`
- **Sanity Studio** (in `./studio/` directory):
  - Development: `npm run dev` (starts Sanity Studio)
  - Build: `npm run build`
  - Deploy: `npm run deploy`

## Architecture

### Tech Stack
- **Framework**: Astro 5.x (SSG mode, no server-side rendering)
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **CMS**: Sanity v3 (headless CMS for blog content)
- **i18n**: Custom implementation with Astro's built-in i18n routing
- **Content**: Bilingual support (English/Arabic) with RTL for Arabic

### Project Structure
```
/
├── src/
│   ├── components/       # Reusable Astro components (Header, Footer, Analytics)
│   ├── config/          # Configuration (URLs for dev/prod)
│   ├── i18n/            # Internationalization utilities and translations
│   │   ├── ui.ts        # All UI translations (LARGE FILE: 33k+ tokens)
│   │   └── utils.ts     # i18n helper functions
│   ├── layouts/         # Page layouts (BaseLayout.astro)
│   ├── lib/             # Utilities and integrations
│   │   └── sanity.ts    # Sanity client, types, GROQ queries, and fetch functions
│   ├── pages/           # File-based routing (index, blog, about, etc.)
│   │   ├── *.astro      # English pages (default locale)
│   │   └── ar/          # Arabic pages (with /ar prefix)
│   └── styles/          # Global styles
│       └── global.css   # Tailwind v4 config and theme variables
├── studio/              # Sanity Studio (separate Node project)
│   ├── schemaTypes/     # Sanity content schemas (post, author, category)
│   └── sanity.config.ts # Studio configuration
└── public/              # Static assets (images, favicon, etc.)
```

### i18n Implementation

The site uses Astro's built-in i18n routing with a custom translation system:

- **Default locale**: English (`en`) - no prefix in URLs
- **Arabic locale**: `ar` - URLs prefixed with `/ar`
- **RTL support**: Automatic for Arabic pages via `dir="rtl"` attribute
- **Translations**: Centralized in `src/i18n/ui.ts` (bilingual object with `en` and `ar` keys)
- **Routing**: Configured in `astro.config.mjs` with `prefixDefaultLocale: false`

**Key i18n utilities** (`src/i18n/utils.ts`):
- `getLangFromUrl(url)` - Extract language from URL path
- `useTranslations(lang)` - Get translation function for a locale
- `getLocalizedPath(path, lang)` - Generate localized URL path
- `isRTL(lang)` - Check if language is RTL
- `getRouteFromUrl(url)` - Get route without language prefix

### Sanity CMS Integration

**Content types** (defined in `studio/schemaTypes/`):
- `post` - Blog posts with bilingual fields
- `author` - Post authors with bilingual bios
- `category` - Post categories with bilingual titles

**Bilingual content structure**:
All CMS content uses nested objects for translations:
```typescript
{
  title: { en: "English", ar: "العربية" },
  body: { en: [...], ar: [...] }
}
```

**Sanity client** (`src/lib/sanity.ts`):
- Configured via environment variables (see `.env.example`)
- Exports TypeScript interfaces for all content types
- Provides pre-built GROQ queries in `queries` object
- Includes helper functions: `getAllPosts()`, `getPostBySlug()`, `getAllCategories()`, etc.
- Utility functions: `getLocalizedText()`, `getLocalizedBlock()` for extracting localized content

**Environment variables** (required):
```
SANITY_PROJECT_ID=zxslyc4b
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=          # Optional: for draft content
```

### Styling System

Uses Tailwind CSS v4 with custom theme matching the Oyifa app design system:

- **Color palette**: Primary (federal blue #421ca4), Secondary (neon blue #595cff), Accent (azure #5682f9)
- **Theme variables**: Defined in `src/styles/global.css` using `@theme` directive
- **Design system**: HSL-based colors matching shadcn/ui pattern
- **Typography**: Cairo font for all text (supports Arabic), Inter as fallback
- **Prose styles**: Custom prose classes in global.css for Tailwind v4 compatibility (blog content)

### Dual-Domain Architecture

The project is part of a larger ecosystem:
- **Marketing site**: `https://oyifa.com` (this repo)
- **Application**: `https://app.oyifa.com` (separate repo)
- **URLs configured**: See `src/config/urls.ts` for dev/prod environment handling

### Page Routing

Astro's file-based routing:
- `/` - Homepage (index.astro)
- `/about` - About page
- `/pricing` - Pricing page
- `/blog` - Blog index
- `/blog/[slug]` - Dynamic blog post pages
- `/contact`, `/faq`, `/privacy`, `/terms` - Static pages
- `/ar/*` - Arabic versions of all pages (mirrored structure)

### Key Patterns

1. **Bilingual components**: Most components accept `lang` prop and use `useTranslations(lang)`
2. **SEO**: BaseLayout includes hreflang tags, Open Graph, canonical URLs, and localized metadata
3. **RTL support**: Automatic via `dir` attribute on `<html>` tag based on language
4. **Static generation**: All pages are pre-rendered at build time (SSG)
5. **Analytics**: Google Analytics integration via Analytics.astro component

## Important Notes

- **Large translation file**: `src/i18n/ui.ts` is 33k+ tokens - use offset/limit when reading
- **Tailwind v4**: Uses new `@theme` directive in CSS, not traditional tailwind.config.js
- **No SSR**: Pure static site generation (no server component or API routes)
- **Studio deployment**: Sanity Studio is a separate deployment (not part of Astro build)
- **Theme consistency**: Color values must match the main app's design system (HSL-based)

import { createClient } from '@sanity/client';
import type { Lang } from '../i18n/utils';

export const client = createClient({
  projectId: 'zxslyc4b',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster reads in production
});

// Type definitions for Sanity content
export interface BilingualText {
  en: string;
  ar: string;
}

export interface BilingualBlock {
  en: any[];
  ar: any[];
}

export interface Author {
  _id: string;
  name: BilingualText;
  slug: { current: string };
  image?: {
    asset: { url: string };
  };
  bio?: BilingualBlock;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  _id: string;
  title: BilingualText;
  slug: { current: string };
  description?: BilingualText;
  color?: string;
}

export interface Post {
  _id: string;
  title: BilingualText;
  slug: { current: string };
  author?: Author;
  mainImage?: {
    asset: { url: string };
    alt?: BilingualText;
  };
  categories?: Category[];
  publishedAt: string;
  excerpt?: BilingualText;
  body?: BilingualBlock;
  seo?: {
    metaTitle?: BilingualText;
    metaDescription?: BilingualText;
  };
}

// Helper to get localized content
export function getLocalizedText(content: BilingualText | undefined, lang: Lang): string {
  if (!content) return '';
  return content[lang] || content.en || '';
}

export function getLocalizedBlock(content: BilingualBlock | undefined, lang: Lang): any[] {
  if (!content) return [];
  return content[lang] || content.en || [];
}

// GROQ Queries
export const queries = {
  // Get all posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset-> { url },
      alt
    },
    author-> {
      _id,
      name,
      slug,
      image { asset-> { url } }
    },
    categories[]-> {
      _id,
      title,
      slug,
      color
    }
  }`,

  // Get single post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    seo,
    mainImage {
      asset-> { url },
      alt
    },
    author-> {
      _id,
      name,
      slug,
      bio,
      image { asset-> { url } },
      social
    },
    categories[]-> {
      _id,
      title,
      slug,
      color
    }
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title.en asc) {
    _id,
    title,
    slug,
    description,
    color
  }`,

  // Get posts by category
  postsByCategory: `*[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset-> { url },
      alt
    },
    author-> {
      _id,
      name,
      slug,
      image { asset-> { url } }
    },
    categories[]-> {
      _id,
      title,
      slug,
      color
    }
  }`,

  // Get recent posts (for homepage)
  recentPosts: `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage {
      asset-> { url },
      alt
    }
  }`,
};

// Fetch functions
export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(queries.allPosts);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(queries.postBySlug, { slug });
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(queries.allCategories);
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  return client.fetch(queries.postsByCategory, { categoryId });
}

export async function getRecentPosts(): Promise<Post[]> {
  return client.fetch(queries.recentPosts);
}

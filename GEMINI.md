# Oyifa Marketing Website - Gemini Context

## Project Overview

This is the **Oyifa marketing website**, a bilingual (English/Arabic) static site built with **Astro** and **Tailwind CSS v4**. It integrates with **Sanity CMS** for content management (blog posts, authors, categories) and features robust internationalization (i18n) with Right-to-Left (RTL) support for Arabic.

Oyifa is an IT procurement platform for the GCC region. This repository contains the public-facing marketing site and the Sanity Studio configuration.

## 🛠 Tech Stack

- **Framework:** Astro 5.x (Static Site Generation)
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite`)
- **CMS:** Sanity v3 (Headless CMS)
- **Language:** TypeScript
- **i18n:** Astro's built-in routing + Custom translation utilities (English/Arabic)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
npm install
cd studio && npm install && cd ..
```

### Development Commands

Run these commands from the project root:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local Astro development server at `localhost:4321`. |
| `npm run build` | Builds the production site to the `./dist/` directory. |
| `npm run preview` | Previews the production build locally. |
| `npm run astro ...` | Runs Astro CLI commands (e.g., `astro add`, `astro check`). |

### Sanity Studio Commands

The CMS configuration lives in the `studio/` directory. Run these commands from inside `studio/`:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Sanity Studio development server. |
| `npm run build` | Builds the Sanity Studio for production. |
| `npm run deploy` | Deploys the Sanity Studio to the hosted Sanity URL. |

## 📂 Project Structure

```text
/
├── public/              # Static assets (images, favicon, etc.)
├── src/
│   ├── components/      # Reusable Astro components (Header, Footer, PricingSchema)
│   ├── config/          # Global configuration (e.g., URLs)
│   ├── i18n/            # Internationalization logic
│   │   ├── ui.ts        # UI Translations dictionary
│   │   └── utils.ts     # Helper functions for i18n (getLangFromUrl, useTranslations)
│   ├── layouts/         # Page layouts (BaseLayout.astro)
│   ├── lib/             # Utilities and integrations
│   │   └── sanity.ts    # Sanity client config, GROQ queries, and types
│   ├── pages/           # File-based routing
│   │   ├── *.astro      # English pages (default locale)
│   │   └── ar/          # Arabic pages (prefixed with /ar)
│   └── styles/          # Global styles
│       └── global.css   # Tailwind v4 theme and custom CSS
├── studio/              # Sanity Studio project
│   ├── schemaTypes/     # Content schemas (post, author, category)
│   └── sanity.config.ts # Studio configuration
├── astro.config.mjs     # Astro configuration
└── package.json         # Project dependencies and scripts
```

## 📐 Key Conventions

### Internationalization (i18n)

*   **Strategy:** Sub-path routing. English is the default (root `/`), Arabic is prefixed (`/ar`).
*   **Translations:** UI strings are stored in `src/i18n/ui.ts`. This file contains a large object keyed by `en` and `ar`.
*   **Helper Functions:** Use `useTranslations(lang)` from `src/i18n/utils.ts` to retrieve localized strings in components.
*   **RTL:** The site automatically switches `dir="rtl"` for Arabic pages.

### Styling

*   **Tailwind CSS v4:** This project uses the latest Tailwind version. Configuration is largely handled via CSS variables and the `@theme` directive in `src/styles/global.css` rather than a `tailwind.config.js`.
*   **Design Tokens:** Colors and fonts match the Oyifa application design system (Federation Blue, Neon Blue, Azure).

### Content Management (Sanity)

*   **Bilingual Content:** Content schemas in `studio/schemaTypes/` are designed to hold both English and Arabic values for text fields (e.g., `title: { en: string, ar: string }`).
*   **Fetching Data:** `src/lib/sanity.ts` exports typed functions to fetch data. Ensure you select the correct language field when displaying content.
*   **Sanity Client:** Uses `@sanity/client` to fetch data at build time.

## ⚙️ Configuration

*   **`astro.config.mjs`:** Configures integrations (Tailwind, Sitemap) and i18n routing options.
*   **Environment Variables:**
    *   `SANITY_PROJECT_ID`: Your Sanity project ID.
    *   `SANITY_DATASET`: The dataset name (e.g., `production`).
    *   `SANITY_API_VERSION`: API version date string.
    *   Create a `.env` file based on `.env.example` if needed for local dev (though public datasets might not require a token for reading).

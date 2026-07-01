// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import cloudflare from '@astrojs/cloudflare';

import { unified } from '@astrojs/markdown-remark';

import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon()],
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node"
  }),

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
  },
});
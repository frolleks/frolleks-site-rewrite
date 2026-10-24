// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

import { unified } from "@astrojs/markdown-remark";

import { remarkReadingTime } from "./remark-reading-time.mjs";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), mdx()],
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
  },
});

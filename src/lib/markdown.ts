import { createMarkdownProcessor } from "@astrojs/markdown-remark";

let processor: ReturnType<typeof createMarkdownProcessor> | undefined;

/**
 * Renders a single line of Markdown (e.g. a post's frontmatter title) to
 * inline HTML, without the wrapping <p>. Supports GFM, so `~text~` becomes
 * <del>text</del>.
 */
export async function renderInlineMarkdown(source: string): Promise<string> {
  processor ??= createMarkdownProcessor({ syntaxHighlight: false });
  const { code } = await (await processor).render(source);
  return code.trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1");
}

/**
 * Plain-text version of a Markdown line for places that can't render HTML,
 * like OpenGraph tags. Struck-through text keeps its line by overlaying each
 * character with U+0336 (combining long stroke).
 */
export function toPlainText(source: string): string {
  return source.replace(/~~?([^~]+?)~~?/g, (_, text: string) =>
    [...text].map((char) => `${char}̶`).join(""),
  );
}

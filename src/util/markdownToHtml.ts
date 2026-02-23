import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";

let start = performance.now();
const markdownIt = MarkdownIt({
  html: true,
}).use(
  await Shiki({
    themes: {
      light: "dark-plus",
      dark: "dark-plus",
    },
    transformers: [
      {
        name: "line-numbers-pre",
        preprocess: (_: string, options: any) => {
          if (options?.meta?.__raw?.includes("line-numbers")) {
            options.attributes = {};
            options.attributes.lineNumbers = true;
          }
        },
      },
      {
        name: "line-numbers-post",
        postprocess: (html, options: any) => {
          if (options?.attributes?.lineNumbers) {
            return html.replace(/<pre /g, "<pre data-linenumbers ");
          }
          return html;
        },
      },
    ],
  }),
);
let end = performance.now();
console.log(`Shiki setup took ${end - start}ms`);

export default async function markdownToHtml(markdown: string) {
  start = performance.now();
  const result = markdownIt.render(markdown);
  end = performance.now();
  console.log(`markdownToHtml took ${end - start}ms`);
  return result;
}

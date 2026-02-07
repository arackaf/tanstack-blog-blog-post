import matter from "gray-matter";
import markdownToHtml from "./markdownToHtml";

export const getAllBlogPosts = () => {
  const allPosts: Record<string, any> = import.meta.glob("../blog/**/*.md", { query: "?raw", eager: true });

  return Object.entries(allPosts).reduce(
    (result, [key, module]) => {
      const paths = key.split("/");
      const slug = paths.at(-2)!;

      result[slug] = module.default;
      return result;
    },
    {} as Record<string, string>,
  );
};

export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  slug: string;
  author: string;
  ogImage: string;
  coverImage: string;
};

export type Post = PostMetadata & {
  content: string;
};

const metadataFields: (keyof PostMetadata)[] = [
  "title",
  "date",
  "description",
  "slug",
  "author",
  "ogImage",
  "coverImage",
];
const postFields: (keyof Post)[] = [...metadataFields, "content"];

export function getPostMetadata(slug: string, fileContents: string): PostMetadata {
  const { data } = matter(fileContents);

  const result: PostMetadata = {
    slug,
  } as PostMetadata;

  // Ensure only the minimal needed data is exposed
  metadataFields.forEach(field => {
    if (typeof data[field] !== "undefined") {
      result[field] = data[field];
    }
  });

  return result;
}

export async function getPost(slug: string, fileContents: string): Promise<Post> {
  const { data, content: markdownContent } = matter(fileContents);
  const content = await markdownToHtml(markdownContent);

  const result: Post = {
    slug,
    content,
  } as Post;

  // Ensure only the minimal needed data is exposed
  postFields.forEach(field => {
    if (typeof data[field] !== "undefined") {
      result[field] = data[field];
    }
  });

  return result;
}

import { FC, PropsWithChildren } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { DateFormatter } from "@/components/date-formatter";
import { GithubIcon } from "@/components/svg/githubIcon";
import { TwitterIcon } from "@/components/svg/twitterIcon";
import { getAllBlogPosts, getPostMetadata, PostMetadata } from "@/util/blog-posts";

const getAllPosts = createServerFn().handler(async () => {
  const postContentLookup = getAllBlogPosts();

  const blogPosts = Object.entries(postContentLookup).map(([slug, content]) => getPostMetadata(slug, content));

  const allPosts: PostMetadata[] = blogPosts
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return allPosts;
});

export const Route = createFileRoute("/")({
  loader: async () => {
    const posts = await getAllPosts();
    return {
      posts,
    };
  },
  component: App,
});

const PersonalLink: FC<PropsWithChildren<{ href: string }>> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="flex items-center sm:gap-0.5 *:first:w-4.5 [&_svg]:fill-(--link-color) sm:[&_svg]:h-4 [&_svg]:h-3.5"
    >
      {children}
    </a>
  );
};

function App() {
  const { posts } = Route.useLoaderData();
  return (
    <div>
      <div className="blog-header flex mb-8">
        <div className="rounded-full overflow-hidden sm:w-[125px] sm:h-[125px] w-24 h-24 sm:min-w-[125px] sm:min-h-[125px] min-w-24 min-h-24">
          <img
            alt="Profile pic"
            className="rounded-full sm:w-[125px] sm:h-[125px] w-24 h-24"
            src="/tanstack-logo.png"
          />
        </div>
        <div className="titles flex flex-col ml-2.5 justify-evenly">
          <div className="flex flex-col gap-1">
            <h1 className="leading-none text-xl sm:text-2xl md:text-3xl font-bold">Blog Name Here</h1>
            <h3 className="leading-none text-sm sm:text-lg md:text-xl font-bold">Personal blog by You</h3>
          </div>
          <div className="personal-links flex flex-col gap-1">
            <h4 className="leading-none sm:text-base text-sm">
              <PersonalLink href="https://twitter.com/demo">
                <span>
                  <TwitterIcon />
                </span>
                <span className="font-bold sm:text-base text-sm leading-none!">you</span>
              </PersonalLink>
            </h4>
            <h4 className="leading-none">
              <PersonalLink href="https://github.com/demo">
                <span>
                  <GithubIcon />
                </span>
                <span className="font-bold sm:text-base text-sm leading-none!">you_also</span>
              </PersonalLink>
            </h4>
          </div>
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-2">
        <p>Hi! 👋</p>
        <p>This is a proof of concept blog, built with TanStack Start.</p>
      </div>

      <div>
        {posts.map(post => (
          <div key={post.title} className="blog-list-item mb-8">
            <h1 className="leading-none text-2xl font-bold">
              <Link to={`/blog/$slug`} params={{ slug: post.slug }}>
                {post.title}
              </Link>
            </h1>
            <small className="text-sm italic">
              <DateFormatter dateString={post.date}></DateFormatter>
            </small>
            <p className="mt-1.5">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

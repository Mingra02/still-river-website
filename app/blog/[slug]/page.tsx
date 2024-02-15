import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/getPostMetadata";

const getPostContent = (slug: string) => {
  const folder = "./blog_posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export default function BlogPost(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  return (
    <section className="overflow-none m-auto -mb-6 mt-20 max-w-7xl px-10 sm:mt-32 lg:mb-16">
      <h1 className="text-4xl text-slate-100">{post.data.title}</h1>
      <article className="prose lg:prose-xl prose-slate prose-invert prose-pre:bg-slate-200 prose-pre:text-slate-800 prose-a:no-underline hover:prose-a:text-slate-400 prose-a:transition">
        <Markdown>{post.content}</Markdown>
      </article>
    </section>
  );
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

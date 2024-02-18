import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/components/getPostMetadata";
import Image from "next/image";
import {
  getTeamMemberData,
  getTagColors,
  formatDate,
} from "@/components/blogUtils";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

const getPostContent = (slug: string) => {
  const folder = "./content/blog_posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export default function BlogPost(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  const team_member_data = getTeamMemberData(post.data.author);
  const author_data =
    team_member_data !== undefined
      ? team_member_data
      : { image: "", role: "", name: "", url: "" };

  return (
    <>
      <div className="fixed bottom-0 top-0 isolate -z-10 m-auto hidden w-screen overflow-clip sm:block lg:mb-0">
        <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
        <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
        <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
        <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
        <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
      </div>
      <section className="m-auto mb-6 mt-20 w-[95%] max-w-7xl rounded-lg px-4 backdrop-blur sm:mt-32 sm:border sm:border-white/20 sm:bg-white/15 sm:px-10 lg:mb-16 ">
        <h1 className="m-auto mt-12 max-w-3xl text-2xl font-bold text-slate-100 md:text-4xl">
          {post.data.title}
        </h1>
        <div className="m-auto mt-4 grid max-w-3xl grid-cols-[auto_1fr] items-center md:mt-8">
          <div className="flex items-center">
            <Image
              src={author_data.image}
              alt={post.data.author}
              width={64}
              height={64}
              className="h-12 w-12 rounded-full sm:h-16 sm:w-16"
            />
            <div className="ml-4">
              <Link href={`/team/${author_data.url}`}>
                <p className="font-bold text-slate-300 hover:text-indigo-400">
                  {post.data.author}
                </p>
              </Link>
              <p className="text-sm text-slate-400 sm:text-base">
                {author_data.role}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-end justify-end gap-x-5">
            <p className="order-last flex-shrink-0 flex-grow-0 text-sm text-slate-400 sm:text-base">
              {formatDate(post.data.date)}
            </p>
            {post.data.tags.map((tag: string) => {
              const colors = getTagColors(tag);
              return (
                <span
                  key={tag}
                  className={`rounded-full px-2 py-1 text-sm font-bold ${colors.bgColor} ${colors.textColor} flex-shrink-0 flex-grow-0`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="relative m-auto mt-8 h-[45vh] max-h-[600px] w-full max-w-3xl overflow-clip rounded-lg text-center">
          <Image
            src={post.data.picture}
            alt={post.data.title}
            fill
            className="object-cover"
          />
        </div>
        <article className="prose prose-slate prose-invert m-auto pb-6 lg:prose-xl prose-a:no-underline prose-a:transition hover:prose-a:text-slate-400 prose-pre:bg-slate-200 prose-pre:text-slate-800 md:pb-12">
          <Markdown>{post.content}</Markdown>
        </article>
      </section>
    </>
  );
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

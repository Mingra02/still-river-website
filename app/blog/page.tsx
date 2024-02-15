import Link from "next/link";
import { PostMetadata } from "@/components/PostMetadata";
import getPostMetadata from "@/components/getPostMetadata";

export const PostPreview = (props: PostMetadata) => {
  return (
    <div className="text-7xl text-slate-200">
      <Link href={`/blog/${props.slug}`}>
        <h2>{props.title}</h2>
      </Link>
    </div>
  );
};

export default function Blog() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post: PostMetadata) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <section className="overflow-none m-auto -mb-6 mt-20 max-w-7xl px-10 sm:mt-32 lg:mb-16">
        <h1 className="text-4xl text-slate-100">The Blog</h1>
        <p className="mt-4 text-lg text-slate-300">
          The Still River blog is a collection of articles, tutorials, and other
          resources to help you build and grow your business. We cover topics
          like data analysis, marketing, and more.
        </p>
        {postPreviews}
      </section>
    </>
  );
}

import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "@/components/PostMetadata";

const getPostMetadata = (): PostMetadata[] => {
  const folder = "blog_posts/";
  const files = fs.readdirSync(folder);

  const posts = files.map((fileName: string) => {
    const fileContents = fs.readFileSync(`${folder}/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      slug: fileName.replace(".md", ""),
      author: matterResult.data.author,
      position: matterResult.data.position,
      tags: matterResult.data.tags,
      picture: matterResult.data.picture,
      content: matterResult.content,
    };
  });

  return posts;
};

export default getPostMetadata;

// "use client";

import React, { useState } from "react";
import Link from "next/link";
import { PostMetadata } from "@/components/PostMetadata";
import getPostMetadata from "@/components/getPostMetadata";
import Image from "next/image";
import {
  getAuthorTitle,
  getTagColors,
  formatDate,
  clipPostContent,
} from "@/components/blogUtils";

const PostPreview = (props: PostMetadata) => {
  const summary = clipPostContent(props.content);

  return (
    <div className="m-auto mt-16 grid max-w-sm grid-cols-1 gap-8 px-8 text-slate-200 xl:max-w-full xl:grid-cols-[auto_1fr] xl:p-0">
      <div className="relative m-auto h-64 w-64 overflow-clip rounded-lg text-center">
        <Image
          src={props.picture}
          alt={props.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-3">
          <p className="text-sm text-slate-400">{formatDate(props.date)}</p>
          {props.tags.map((tag: string) => {
            const colors = getTagColors(tag);
            return (
              <span
                key={tag}
                className={`rounded-full px-2 py-1 text-sm font-bold ${colors.bgColor} ${colors.textColor} flex-shrink-0 flex-grow-0 text-xs`}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <Link href={`/blog/${props.slug}`}>
          <h2 className="order-1 mt-1 text-xl font-semibold transition-colors hover:text-indigo-300 xl:order-none">
            {props.title}
          </h2>
        </Link>
        <p className="order-2 mt-4 flex-grow text-slate-400 xl:order-none">
          {summary}
        </p>
        <div className="order-1 flex w-full items-center border-slate-700 pt-4 xl:order-none  xl:mt-8 xl:border-t">
          <Image
            src={getAuthorTitle(props.author).image}
            alt={props.author}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <p className="font-semibold text-slate-300">{props.author}</p>
            <p className="text-sm text-slate-400">
              {getAuthorTitle(props.author).role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [author, setAuthor] = useState("");
  // const [date, setDate] = useState("");
  // const [beforeAfter, setBeforeAfter] = useState("");

  let postMetadata = getPostMetadata();

  postMetadata = postMetadata
    // .filter((post: PostMetadata) => {
    //   return (
    //     post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //     post.author.toLowerCase().includes(author.toLowerCase()) &&
    //     (beforeAfter === "before" ? post.date <= date : post.date >= date)
    //   );
    // })
    .sort((a: PostMetadata, b: PostMetadata) => {
      return b.date.localeCompare(a.date);
    });

  const postPreviews = postMetadata.map((post: PostMetadata) => (
    <PostPreview key={post.slug} {...post} />
  ));

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuthor(event.target.value);
  // };

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDate(event.target.value);
  // };

  // const handleBeforeAfterChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setBeforeAfter(event.target.value);
  // };

  return (
    <>
      <section className="overflow-none m-auto -mb-6 mt-20 max-w-7xl px-10 sm:mt-32 lg:mb-16">
        <div className="grid grid-cols-[1fr_auto] gap-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-100">The Blog</h1>
            <p className="mt-4 text-lg text-slate-400">
              The Still River blog is a collection of articles, tutorials, and
              other resources to help you build and grow your business. We cover
              topics like data analysis, marketing, and more.
            </p>
            <div className="grid grid-cols-1 content-center md:grid-cols-2 xl:grid-cols-1">
              {postPreviews}
            </div>
          </div>
          <div className="hidden w-[300px] lg:block">
            <h2 className="text-2xl text-slate-100">Filters</h2>
            <p className="mt-8 text-slate-400">Search</p>
            <input
              type="text"
              className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-8 text-slate-400">Author</p>
            <input
              type="text"
              className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-8 text-slate-400">Date</p>
            <input
              type="date"
              className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex">
              <label className="my-3 flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                <input
                  type="radio"
                  name="date_before"
                  className="mr-2 border-white/20 bg-white/15 checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                />
                Before
              </label>
              <label className="my-3 flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                <input
                  type="radio"
                  name="date_before"
                  className="checked:bg- peer mr-2 border-white/20 bg-white/15 focus:bg-none focus:ring-0 focus:ring-offset-0"
                />
                After
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PostMetadata } from "@/components/PostMetadata";
import Image from "next/image";
import {
  getTeamMemberData,
  getTagColors,
  formatDate,
  clipPostContent,
} from "@/components/blogUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const PostPreview = (props: PostMetadata) => {
  const summary = clipPostContent(props.content);
  const teamMemberData = getTeamMemberData(props.author);
  const authorData =
    teamMemberData !== undefined
      ? teamMemberData
      : { image: "", role: "", name: "", url: "" };

  return (
    <div className="m-auto mt-16 grid max-w-sm grid-cols-1 gap-8 text-slate-200 first:mt-8 md:mt-8 md:px-8 xl:mt-16 xl:max-w-full xl:grid-cols-[auto_1fr] xl:p-0">
      <div className="relative m-auto h-64 w-full overflow-clip rounded-lg text-center xl:h-64 xl:w-64">
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
            src={authorData.image}
            alt={authorData.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <Link href={`/team/${authorData.url}`}>
              <p className="font-semibold text-slate-300 transition-colors hover:text-indigo-400">
                {authorData.name}
              </p>
            </Link>
            <p className="text-sm text-slate-400">{authorData.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [beforeAfter, setBeforeAfter] = useState("before");
  const [filterOpen, setFilterOpen] = useState(false);
  const [order, setOrder] = useState("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const result = posts
      .filter((post: PostMetadata) => {
        const postDate = new Date(post.date);
        const comparisonDate = new Date(date);
        return (
          (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase()),
            ) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
          post.author.toLowerCase().includes(author.toLowerCase()) &&
          (beforeAfter === "before"
            ? postDate <= comparisonDate
            : postDate >= comparisonDate) &&
          (selectedTags.length === 0 ||
            selectedTags.some((tag) => post.tags.includes(tag)))
        );
      })
      .sort((a: PostMetadata, b: PostMetadata) => {
        if (order === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      })
      .slice(0, 10);
    setFilteredPosts(result);
  }, [posts, searchTerm, author, date, beforeAfter, order, selectedTags]);

  const postPreviews =
    filteredPosts.length > 0 ? (
      filteredPosts.map((post: PostMetadata) => (
        <PostPreview key={post.slug} {...post} />
      ))
    ) : (
      <div
        className={`col-span-full mt-12 rounded-lg border-2 border-dashed border-white/25`}
      >
        <Image
          src="/img/undraw_no_data.svg"
          alt="No Posts Found"
          height={560}
          width={710}
          className="m-auto mt-10 w-1/2 max-w-lg fill-indigo-500 stroke-slate-500 object-cover opacity-80 md:mt-24"
        />
        <i className="mb-12 mt-12 block w-full text-center text-slate-400">
          No Posts Found
        </i>
      </div>
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleBeforeAfterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBeforeAfter(event.target.value);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value;
    if (event.target.checked) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
    console.log(selectedTags);
  };

  return (
    <>
      <section className="overflow-none relative m-auto mb-12 mt-20 max-w-7xl px-10 sm:mt-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-slate-100">The Blog</h1>
              <FontAwesomeIcon
                icon={filterOpen ? faFilterCircleXmark : faFilter}
                height={24}
                width={24}
                onClick={handleFilterOpen}
                className="fa-lg cursor-pointer text-slate-200 lg:hidden"
              />
            </div>
            <p className="mt-4 text-lg text-slate-400">
              The Still River blog is a collection of articles, tutorials, and
              other resources to help you build and grow your business. We cover
              topics like data analysis, marketing, and more.
            </p>
            <div className="grid grid-cols-1 content-center md:grid-cols-2 xl:grid-cols-1">
              {postPreviews}
            </div>
          </div>
          <div
            className={`absolute left-0 top-12 w-screen border-b-2 border-white/15 px-12 drop-shadow lg:relative lg:top-0 lg:block lg:w-[300px] lg:border-none lg:bg-slate-950 lg:px-0 lg:drop-shadow-none ${filterOpen ? "absolute" : "hidden"} z-10 bg-slate-950/70 backdrop-blur`}
          >
            <h2 className="text-2xl text-slate-100">Filters</h2>
            <p className="mt-8 text-slate-400">Search</p>
            <input
              type="text"
              onChange={handleSearchChange}
              value={searchTerm}
              className="w-full max-w-md items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-8 text-slate-400">Author</p>
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              className="w-full max-w-md items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-8 text-slate-400">Date</p>
            <input
              type="date"
              onChange={handleDateChange}
              value={date}
              className="w-full max-w-md items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex">
              <label className="flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                <input
                  type="radio"
                  value="before"
                  checked={beforeAfter === "before"}
                  onChange={handleBeforeAfterChange}
                  name="date_before"
                  className="mr-2 border-white/20 bg-white/15 checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                />
                Before
              </label>
              <label className="flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                <input
                  type="radio"
                  value="after"
                  checked={beforeAfter === "after"}
                  onChange={handleBeforeAfterChange}
                  name="date_after"
                  className="checked:bg- peer mr-2 border-white/20 bg-white/15 focus:bg-none focus:ring-0 focus:ring-offset-0"
                />
                After
              </label>
            </div>
            <div className="max-w-md">
              <p className="mt-4 text-slate-400">Tags</p>
              <div className="mt-4 flex flex-wrap gap-4">
                {posts
                  .reduce((tags: string[], post: PostMetadata) => {
                    post.tags.forEach((tag) => {
                      if (!tags.includes(tag)) {
                        tags.push(tag);
                      }
                    });
                    return tags;
                  }, [])
                  .map((tag) => {
                    const colors = getTagColors(tag);
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <label
                        key={tag}
                        htmlFor={tag}
                        className={`cursor-pointer items-center rounded-md transition-opacity ${isSelected ? "opacity-100" : "opacity-50"}`}
                      >
                        <input
                          type="checkbox"
                          id={tag}
                          value={tag}
                          checked={isSelected}
                          onChange={handleTagChange}
                          className="hidden"
                        />
                        <span
                          className={`rounded-full px-2 py-1 text-sm font-bold ${colors.bgColor} ${colors.textColor} flex-shrink-0 flex-grow-0 text-xs`}
                        >
                          {tag}
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>
            <div>
              <p className="mt-4 text-slate-400">Order</p>
              <div className="flex">
                <label className="flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                  <input
                    type="radio"
                    value="newest"
                    checked={order === "newest"}
                    onChange={handleOrderChange}
                    name="order_newest"
                    className="mr-2 border-white/20 bg-white/15 checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                  />
                  Newest First
                </label>
                <label className="flex cursor-pointer items-center rounded-md px-3 py-2 text-slate-400 accent-indigo-500 transition-colors">
                  <input
                    type="radio"
                    value="oldest"
                    checked={order === "oldest"}
                    onChange={handleOrderChange}
                    name="order_oldest"
                    className="checked:bg- peer mr-2 border-white/20 bg-white/15 focus:bg-none focus:ring-0 focus:ring-offset-0"
                  />
                  Oldest first
                </label>
              </div>
            </div>
            <button
              onClick={handleFilterOpen}
              className="mb-8 mt-4 flex w-full max-w-md items-center justify-center rounded-md bg-indigo-500 px-6 py-2 font-semibold text-indigo-100 transition duration-200 hover:bg-indigo-600 focus:animate-pulse focus:bg-indigo-600 focus:outline-indigo-600 sm:w-auto lg:hidden"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
"use client";

import AddPost from "@/components/AddPost";
import ForumNavigation from "@/components/ForumNavigation";
import Lights from "@/components/Lights";
import ThreadPosts from "@/components/ThreadPosts";
import UserForumTag from "@/components/UserForumTag";
import UserNavigation from "@/components/UserNavigation";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

// Define types for the user and post data
type ProfilePost = {
  post_id: number;
  from_user_id: number;
  from_username: string;
  from_users_avatar: string;
  content: string;
  created_at: string;
};

type RecentActivityPost = {
  post_id: number;
  thread_id: number;
  thread_title: string;
  post_content: string;
  post_time: string;
};

type User = {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  member_since: string;
  last_seen: string;
  gender: string;
  birthday: string;
  total_posts: number;
  total_threads: number;
  recent_activity: RecentActivityPost[];
  profile_posts: ProfilePost[];
  description: string;
  type: string;
  status: string;
  title: string;
  avatar: number;
};

const UserPage = () => {
  const searchParams = useSearchParams();
  const user_id = searchParams ? searchParams.get("user_id") : "1";
  const [activePanel, setActivePanel] = useState("Profile Posts");

  const handlePanelChange = (panel: string) => {
    setActivePanel(panel);
  };

  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const dayWithSuffix = day + getOrdinalSuffix(day);
    const monthName = date.toLocaleDateString(undefined, { month: "long" });
    const yearString = date.getFullYear();

    return `${monthName} ${dayWithSuffix}, ${yearString}`;
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const [user, setUser] = useState<User>({
    user_id: 0,
    first_name: "",
    last_name: "",
    username: "User",
    member_since: "1994-05-23",
    last_seen: "1994-05-23",
    gender: "",
    birthday: "",
    total_posts: 0,
    total_threads: 0,
    recent_activity: [],
    profile_posts: [],
    description: "",
    type: "",
    status: "",
    title: "",
    avatar: 0,
  });

  useEffect(() => {
    fetch(
      `https://www.the-still-river.com/api/forum/users.php?user_id=${user_id}`,
    )
      .then((res) => res.json())
      .then((data: User) => setUser(data));
  }, [user_id]);

  const onPostSubmit = () => {
    fetch(
      `https://www.the-still-river.com/api/forum/users.php?user_id=${user_id}`,
    )
      .then((res) => res.json())
      .then((data: User) => setUser(data));
  };

  return (
    <>
      <Lights position="fixed" />
      <section className="m-auto mb-12 mt-24 w-full max-w-7xl rounded-lg border border-white/15 bg-white/10 p-2 shadow-lg drop-shadow-lg backdrop-blur-lg md:p-8 xl:w-[95%] xl:px-14 ">
        <ForumNavigation active="Users" />
        <Suspense fallback={<div>Loading...</div>}>
          <div className="mt-10 grid grid-cols-1 items-center justify-center gap-4 text-slate-400 sm:grid-cols-[auto_1fr] sm:gap-12">
            <div className="text-center">
              <Image
                src={`https://www.the-still-river.com/img/forum/avatars/${user.avatar}.jpg`}
                alt={`${user.username}'s avatar`}
                className="m-auto h-48 w-48 rounded-full border border-white/15"
                width={192}
                height={192}
              />
            </div>
            <div>
              <h1 className="text-center text-3xl font-bold text-slate-200 sm:text-left">
                {user.username}
              </h1>
              <div className="my-4 text-center sm:text-left">
                <UserForumTag role={user.type} />
              </div>
              <div className="m-auto grid max-w-xs grid-cols-2 gap-4 sm:m-0">
                <div className="text-left">
                  <p>Member Since:</p>
                  <p>Last Seen:</p>
                  <p>Total Posts:</p>
                  <p>Total Threads:</p>
                </div>
                <div className="text-right text-slate-200">
                  <p>{formatDate(user.member_since)}</p>
                  <p>{formatDate(user.last_seen)}</p>
                  <p>{user.total_posts}</p>
                  <p>{user.total_threads}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <ul className="no-scrollbar mx-4 flex max-w-[100%] overflow-x-scroll text-slate-400">
              <li
                className={`flex w-44 flex-shrink-0 justify-center pb-2 hover:cursor-pointer ${
                  activePanel === "Profile Posts"
                    ? "border-b-2 border-indigo-400 text-indigo-400"
                    : "border-b border-slate-400"
                }`}
                onClick={() => handlePanelChange("Profile Posts")}
              >
                Profile Posts
              </li>
              <li
                className={`flex w-44 flex-shrink-0 justify-center pb-2 hover:cursor-pointer ${
                  activePanel === "Recent Activity"
                    ? "border-b-2 border-indigo-400 text-indigo-400"
                    : "border-b border-slate-400"
                }`}
                onClick={() => handlePanelChange("Recent Activity")}
              >
                Recent Activity
              </li>
              <li
                className={`flex w-44 flex-shrink-0 justify-center pb-2 hover:cursor-pointer ${
                  activePanel === "About"
                    ? "border-b-2 border-indigo-400 text-indigo-400"
                    : "border-b border-slate-400"
                }`}
                onClick={() => handlePanelChange("About")}
              >
                About
              </li>
              <li className="flex-grow justify-center border-b border-slate-400 pb-2"></li>
            </ul>
          </div>
          {activePanel === "Profile Posts" && (
            <>
              <div className="my-10 w-full rounded bg-gray-950/80 px-8 py-4 text-slate-400 shadow">
                {user.profile_posts.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-lg font-bold text-slate-200">
                      No profile posts found
                    </p>
                    <p className="text-slate-400">
                      Be the first to post on this user&apos;s profile!
                    </p>
                  </div>
                ) : (
                  user.profile_posts.map((post) => (
                    <div
                      className="mt-4 border-b border-b-slate-400/40"
                      key={post.post_id}
                    >
                      <div className="grid grid-cols-[auto_1fr_auto] items-center justify-center">
                        <Image
                          src={`https://www.the-still-river.com/img/forum/avatars/${post.from_users_avatar}.jpg`}
                          alt={`${post.from_username}'s avatar`}
                          className="h-12 w-12 rounded-full border border-white/15"
                          width={48}
                          height={48}
                        />
                        <h2 className="ml-4 text-lg font-bold text-slate-200 transition-colors hover:text-indigo-400">
                          <Link
                            href={`/forum/users/?user_id=${post.from_user_id}`}
                          >
                            {post.from_username}
                          </Link>
                        </h2>
                        <p className="text-slate-400">{post.created_at}</p>
                      </div>
                      <div className="prose prose-invert my-3 !max-w-none">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {post.content}
                        </Markdown>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <AddProfilePost user_id={user_id} onPostSubmit={onPostSubmit} />
            </>
          )}
          {activePanel === "Recent Activity" && (
            <div className="my-10 w-full rounded bg-gray-950/80 px-8 py-4 text-slate-400 shadow">
              {user.recent_activity.map((post) => (
                <div
                  className="mt-4 border-b border-b-slate-400/40"
                  key={post.post_id}
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center justify-center">
                    <Image
                      src={`https://www.the-still-river.com/img/forum/avatars/${user.avatar}.jpg`}
                      alt={`${user.username}'s avatar`}
                      className="h-12 w-12 rounded-full border border-white/15"
                      width={48}
                      height={48}
                    />
                    <h2 className="ml-4 text-lg font-bold text-slate-200 transition-colors hover:text-indigo-400">
                      <Link href={`/forum/thread/?thread_id=${post.thread_id}`}>
                        {post.thread_title}
                      </Link>
                    </h2>
                    <p className="text-slate-400">{post.post_time}</p>
                  </div>
                  <div className="prose prose-invert my-3 !max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {post.post_content}
                    </Markdown>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activePanel === "About" && (
            <div className="my-10 w-full rounded bg-gray-950/80 px-8 py-8 text-slate-400 shadow">
              <div className="m-auto grid max-w-xs grid-cols-2 gap-4 sm:m-0">
                <div className="text-left">
                  <p>Birthday:</p>
                  <p>Gender:</p>
                </div>
                <div className="text-right text-slate-200">
                  <p>{formatDate(user.birthday)}</p>
                  <p>{user.gender}</p>
                </div>
              </div>
              <p>Description:</p>
              <div className="prose prose-invert !max-w-none">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {user.description}
                </Markdown>
              </div>
            </div>
          )}
        </Suspense>
      </section>
    </>
  );
};

import React from "react";
import AddProfilePost from "@/components/AddProfilePost";

const FullUserPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPage />
    </Suspense>
  );
};

export default FullUserPage;

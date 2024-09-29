"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ForumNavigation from "@/components/ForumNavigation";
import Login from "@/components/Login";
import Recents from "@/components/Recents";
import Statistics from "@/components/Statistics";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AddPost from "./AddPost";

export interface ThreadData {
  topic_id: number;
  topic_title: string;
  thread_id: number;
  thread_title: string;
  post_id: number;
  content: string;
  created_at: string;
  user_id: number;
  username: string;
  avatar: string;
}

const ThreadPosts = () => {
  const [threadData, setThreadData] = useState<ThreadData[]>([
    {
      topic_id: 0,
      topic_title: "",
      thread_id: 0,
      thread_title: "",
      post_id: 0,
      content: "",
      created_at: "",
      user_id: 0,
      username: "",
      avatar: "0",
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  const [breadCrumbs, setBreadCrumbs] = useState([
    { name: "Forum", url: "/forum" },
  ]);

  const searchParams = useSearchParams();

  const thread_id = searchParams ? searchParams.get("thread_id") : "1";

  const fetchThreadData = useCallback(async () => {
    setIsLoading(true); // Set loading to true when starting to fetch
    try {
      const response = await fetch(
        `https://www.the-still-river.com/api/forum/thread.php?thread_id=${thread_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await response.json();
      setThreadData(data);
      setIsLoading(false); // Set loading to false once data is received
      setBreadCrumbs([
        { name: "Forum", url: "/forum" },
        {
          name: data[0].topic_title,
          url: `/forum/topic?topic_id=${data[0].topic_id}`,
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch topic data:", error);
      setIsLoading(false); // Ensure loading is set to false even on error
    }
  }, [thread_id]);

  useEffect(() => {
    fetchThreadData();
  }, [fetchThreadData]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs links={breadCrumbs} />
      </Suspense>
      <div className="mt-8 rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg">
        {isLoading ? (
          <div className="h-10 w-[80%] animate-pulse rounded bg-slate-600"></div>
        ) : (
          <h2 className="text-3xl font-bold text-slate-200">
            {threadData[0].thread_title}
          </h2>
        )}
        {isLoading ? (
          <div className="mb-4 mt-2 h-4 w-[100px] animate-pulse rounded bg-slate-600"></div>
        ) : (
          <p className="mb-4 mt-2 text-slate-400">
            {new Date(threadData[0].created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
        {threadData.map((post) => (
          <div
            key={post.post_id}
            className="grid w-full grid-cols-1 gap-8 border-t border-white/25 p-4 md:grid-cols-[auto_1fr]"
          >
            <div className="flex flex-row items-center gap-4 md:flex-col">
              {isLoading ? (
                <div className="h-10 w-10 animate-pulse rounded-full bg-slate-600 md:h-32 md:w-32"></div>
              ) : (
                <Image
                  src={`https://www.the-still-river.com/img/forum/avatars/${post.avatar == "0" ? "0" : post.user_id}.jpg`}
                  alt={`${post.username}`}
                  width={128}
                  height={128}
                  className="h-10 w-10 rounded-full md:h-32 md:w-32"
                />
              )}
              {isLoading ? (
                <div className="mt-2 h-5 w-[150px] flex-grow animate-pulse rounded bg-slate-600"></div>
              ) : (
                <p className="flex-grow font-bold text-slate-200">
                  {post.username}
                </p>
              )}
              {isLoading ? (
                <div className="h-4 w-[100px] animate-pulse rounded bg-slate-600 md:hidden"></div>
              ) : (
                <p className="text-sm text-slate-400 md:hidden">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
            <div>
              {isLoading ? (
                <div className="mb-4 hidden h-4 w-[100px] animate-pulse rounded bg-slate-600 md:block"></div>
              ) : (
                <p className="mb-4 hidden text-sm text-slate-400 md:block">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
              <p className="text-slate-400">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
      <AddPost thread_id={thread_id} onPostSubmit={fetchThreadData} />
    </>
  );
};

export default ThreadPosts;

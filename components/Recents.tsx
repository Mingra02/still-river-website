"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PostData {
  thread_id: number;
  user_id: number;
  username: string;
  avatar: string;
  thread_title: string;
  created_at: string;
}

const Recents = () => {
  const [postData, setPostData] = useState<PostData[]>([
    {
      thread_id: 0,
      user_id: 0,
      username: "",
      avatar: "",
      thread_title: "",
      created_at: "",
    },
    {
      thread_id: 1,
      user_id: 0,
      username: "",
      avatar: "",
      thread_title: "",
      created_at: "",
    },
    {
      thread_id: 2,
      user_id: 0,
      username: "",
      avatar: "",
      thread_title: "",
      created_at: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.the-still-river.com/api/forum/recent.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: PostData[]) => {
        setPostData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full rounded-xl bg-slate-950/70 px-6 pb-6 pt-3 shadow-lg">
      <h3 className="text-lg font-bold text-slate-200">Latest Posts</h3>
      {postData.map((post) => (
        <div
          key={post.thread_id}
          className="mt-4 grid grid-cols-[auto_1fr] gap-4 text-sm"
        >
          {isLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-400"></div>
          ) : (
            <Image
              src={`https://www.the-still-river.com/img/forum/avatars/${post.avatar == "0" ? "0" : post.user_id}.jpg`}
              alt={post.username}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {isLoading ? (
              <div className="col-span-2 h-4 w-full animate-pulse rounded bg-slate-400"></div>
            ) : (
              <p className="col-span-2 overflow-clip text-ellipsis text-nowrap text-slate-200 transition-colors hover:text-indigo-300">
                <Link href={`/forum/thread?thread_id=${post.thread_id}`}>
                  {post.thread_title}
                </Link>
              </p>
            )}
            {isLoading ? (
              <div className="col-span-2 h-4 w-full animate-pulse rounded bg-slate-400"></div>
            ) : (
              <>
                <p className="text-slate-400">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-slate-200 transition-colors hover:text-indigo-400">
                  <Link href={`/forum/users?user_id=${post.user_id}`}>
                    {post.username}
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recents;

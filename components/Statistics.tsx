"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ForumStatistics {
  thread_count?: number;
  post_count?: number;
  user_count?: number;
  most_recent_user?: string;
  most_recent_user_id?: number;
}

const Statistics = () => {
  const [forumStatistics, setForumStatistics] = useState<ForumStatistics>({});

  useEffect(() => {
    fetch("https://www.the-still-river.com/api/forum/statistics.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: ForumStatistics) => {
        setForumStatistics(data);
      });
  }, []);

  return (
    <div className="w-full rounded-xl bg-slate-950/70 px-6 pb-6 pt-3 shadow-lg">
      <h3 className="text-lg font-bold text-slate-200">Forum Statistics</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-400">
        <div>
          <div>Threads</div>
          <div>Posts</div>
          <div>Members</div>
          <div>Latest Member</div>
        </div>
        <div className="text-right text-slate-200">
          <div>{forumStatistics.thread_count}</div>
          <div>{forumStatistics.post_count}</div>
          <div>{forumStatistics.user_count}</div>
          <div className="transition-colors hover:text-indigo-400">
            <Link
              href={`/forum/users/?user_id=${forumStatistics.most_recent_user_id}`}
            >
              {forumStatistics.most_recent_user}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

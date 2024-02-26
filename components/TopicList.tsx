"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TopicData } from "@/components/TopicPage";

interface TopicListProps {
  topicData: TopicData[];
  isLoading: boolean;
}

const TopicList: React.FC<TopicListProps> = ({ topicData, isLoading }) => {
  return (
    <div className="mb-auto grid grid-cols-1 gap-4">
      <div className="rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg">
        <div className="grid grid-cols-[1fr_auto]">
          {isLoading ? (
            <div className="h-10 w-[80%] animate-pulse rounded bg-slate-400"></div>
          ) : (
            <h2 className="text-3xl font-bold text-slate-200">
              {topicData[0].topic_title}
            </h2>
          )}
          <div className="flex justify-center rounded bg-teal-600 px-5 py-2 font-bold text-teal-100 transition-colors hover:bg-teal-700 hover:text-teal-200">
            New Thread
          </div>
        </div>
        {isLoading ? (
          <div className="mb-6 mt-2 h-4 w-[60%] animate-pulse rounded bg-slate-400"></div>
        ) : (
          <p className="mb-6 mt-2 text-slate-400">
            {topicData[0].topic_description}
          </p>
        )}
        {topicData[0].thread_title &&
          topicData.map((thread) => (
            <div
              key={thread.thread_id}
              className="grid grid-cols-1 border-t border-white/25 py-4 text-slate-400 md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_100px_250px]"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-300">
                  {thread.thread_title}
                </h3>
                <p className="text-sm">
                  <span className="text-slate-200">
                    {thread.thread_author_username}
                  </span>
                  <span className="ml-3 text-slate-400">
                    {new Date(thread.latest_post_created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </p>
              </div>
              <div className="hidden flex-col justify-center text-sm lg:flex">
                <div className="m-0 p-0">Posts: {thread.post_count}</div>
              </div>
              <div className="my-2 grid h-full grid-cols-[1fr_auto] items-center justify-center gap-5 md:my-0">
                <div className="grid grid-cols-1 text-right text-sm">
                  <span className="ml-3 text-slate-200">
                    {thread.latest_post_author_username}
                  </span>
                  <span>
                    {new Date(thread.latest_post_created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
                <div>
                  <Image
                    src={`https://www.the-still-river.com/img/forum/avatars/${thread.latest_post_author_id}.jpg`}
                    alt={thread.latest_post_author_username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopicList;

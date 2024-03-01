"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TopicData } from "@/components/TopicPage";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
            <h2 className="text-xl font-bold text-slate-200 lg:text-3xl">
              {topicData[0].topic_title}
            </h2>
          )}
          <Link href={`/forum/thread/new?topic_id=${topicData[0].topic_id}`}>
            <div className="m-auto flex justify-center rounded bg-teal-600 px-3 py-2 font-bold text-teal-100 transition-colors hover:bg-teal-700 hover:text-teal-200 sm:px-5">
              <p className="hidden sm:block">New Thread</p>
              <FontAwesomeIcon
                icon={faPlus}
                className="fa-lg block sm:hidden"
              />
            </div>
          </Link>
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
              className="grid grid-cols-[1fr_auto] border-t border-white/25 py-4 text-slate-400 sm:grid-cols-[1fr_150px] lg:grid-cols-[1fr_100px_150px]"
            >
              <div>
                <h3 className="text-lg font-semibold text-slate-300 transition-colors hover:text-indigo-400">
                  <Link href={`/forum/thread?thread_id=${thread.thread_id}`}>
                    {thread.thread_title}
                  </Link>
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
              <div className="grid h-full items-center justify-end gap-5 sm:grid-cols-[1fr_auto] md:my-0 md:justify-center">
                <div className="hidden flex-col justify-start text-right text-sm sm:flex">
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

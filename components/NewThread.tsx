"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import ForumNavigation from "@/components/ForumNavigation";
import Login from "@/components/Login";
import Recents from "@/components/Recents";
import Statistics from "@/components/Statistics";
import TopicList from "@/components/TopicList";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AddThread from "./AddThread";

export interface TopicData {
  topic_id: number;
  topic_title: string;
  topic_description: string;
  thread_id: string;
  thread_title: string;
  thread_author_id: number;
  thread_author_username: string;
  post_count: number;
  latest_post_author_id: number;
  latest_post_author_username: string;
  latest_post_created_at: string;
}

const NewThread = () => {
  const [topicData, setTopicData] = useState<TopicData[]>([
    {
      topic_id: 0,
      topic_title: "",
      topic_description: "",
      thread_id: "",
      thread_title: "",
      thread_author_id: 0,
      thread_author_username: "",
      post_count: 0,
      latest_post_author_id: 0,
      latest_post_author_username: "",
      latest_post_created_at: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [breadCrumbs, setBreadCrumbs] = useState([
    { name: "Forum", url: "/forum" },
  ]);
  const searchParams = useSearchParams();
  const topicId = searchParams ? searchParams.get("topic_id") : "1";

  useEffect(() => {
    setIsLoading(true); // Set loading to true when starting to fetch
    fetch(
      `https://www.the-still-river.com/api/forum/topic.php?topic_id=${topicId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setTopicData(data);
        setIsLoading(false); // Set loading to false once data is received
        setBreadCrumbs([
          { name: "Forum", url: "/forum" },
          {
            name: data[0].topic_title,
            url: `/forum/topic?topic_id=${topicId}`,
          },
        ]);
      })
      .catch((error) => {
        console.error("Failed to fetch topic data:", error);
        setIsLoading(false); // Ensure loading is set to false even on error
      });
  }, [topicId]);

  return (
    <section className="m-auto mb-12 mt-24 w-full max-w-7xl rounded-lg border border-white/15 bg-white/10 p-2 shadow-lg drop-shadow-lg backdrop-blur-lg md:p-8 xl:w-[95%] xl:px-14">
      <ForumNavigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Breadcrumbs links={breadCrumbs} />
      </Suspense>
      <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_auto]">
        <div className="mb-auto mt-8 rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg">
          {isLoading ? (
            <div className="h-10 w-[80%] animate-pulse rounded bg-slate-400"></div>
          ) : (
            <h2 className="text-xl font-bold text-slate-200 lg:text-3xl">
              {topicData[0].topic_title}
            </h2>
          )}
          {isLoading ? (
            <div className="mb-6 mt-2 h-4 w-[60%] animate-pulse rounded bg-slate-400"></div>
          ) : (
            <p className="mb-6 mt-2 text-slate-400">
              {topicData[0].topic_description}
            </p>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <AddThread topic_id={topicId} />
          </Suspense>
        </div>
        <div className="m-auto grid w-[300px] grid-cols-1 gap-4 md:w-full md:grid-cols-2 md:items-start lg:grid-cols-3 xl:flex xl:h-full xl:w-[300px] xl:flex-col">
          <Login />
          <Recents />
          <Statistics />
        </div>
      </div>
    </section>
  );
};

export default NewThread;

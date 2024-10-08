"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Thread {
  thread_id: number;
  user_id: number;
  user_name: string;
  user_avatar: string;
  thread_title: string;
  post_date: string;
}

interface Topic {
  topic_id: number;
  topic_title: string;
  topic_description: string;
  thread_count: number;
  post_count: number;
  threads: Thread[];
}

interface Forum {
  forum_title: string;
  forum_description: string;
  topics: Topic[];
}

const Forums = () => {
  const [forumData, setForumData] = React.useState([]);

  useEffect(() => {
    fetch("https://www.the-still-river.com/api/forum/forum.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setForumData(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {forumData.map((forum: Forum) => (
        <div
          key={forum.forum_title}
          className="rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-slate-200">
            {forum.forum_title}
          </h2>
          <p className="mb-6 mt-2 text-slate-400">{forum.forum_description}</p>
          {forum.topics.map((topic: Topic) => (
            <div
              key={topic.topic_title}
              className="grid grid-cols-1 border-t border-white/25 py-4 text-slate-400 md:grid-cols-[1fr_250px] lg:grid-cols-[1fr_100px_250px]"
            >
              <div>
                <Link href={`/forum/topic?topic_id=${topic.topic_id}`}>
                  <h3 className="text-lg font-semibold text-slate-300 transition-colors hover:text-indigo-400">
                    {topic.topic_title}
                  </h3>
                </Link>
                <p className="pr-2 text-sm text-slate-400">
                  {topic.topic_description}
                </p>
              </div>
              <div className="hidden flex-col justify-center text-sm lg:flex">
                <div className="m-0 p-0">Threads: {topic.thread_count}</div>
                <div className="m-0 p-0">Posts: {topic.post_count}</div>
              </div>
              <div className="my-2 grid h-full max-w-full grid-cols-[minmax(40px,auto)_1fr] items-center justify-start gap-5 overflow-hidden text-ellipsis text-nowrap md:my-0">
                <div>
                  <Image
                    src={
                      topic.threads && topic.threads.length > 0
                        ? `https://www.the-still-river.com/img/forum/avatars/${topic.threads[0].user_avatar == "0" ? "0" : topic.threads[0].user_id}.jpg`
                        : `https://www.the-still-river.com/img/placeholder-male.webp`
                    }
                    alt={
                      topic.threads && topic.threads.length > 0
                        ? topic.threads[0].user_name
                        : "Placeholder User"
                    }
                    width={40}
                    height={40}
                    className={
                      topic.threads && topic.threads.length > 0
                        ? `rounded-full`
                        : `rounded-full opacity-50`
                    }
                  />
                </div>
                <div className="w-full max-w-full">
                  <div className="grid-col-1 grid w-full max-w-full overflow-hidden text-ellipsis text-nowrap">
                    {topic.threads && topic.threads.length > 0 ? (
                      <Link
                        href={`/forum/thread?thread_id=${topic.threads[0].thread_id}`}
                      >
                        <div className="w-full overflow-clip text-ellipsis text-nowrap text-slate-200 transition-colors hover:text-indigo-300 md:max-w-[190px]">
                          {topic.threads[0].thread_title}
                        </div>
                      </Link>
                    ) : (
                      <i className="w-full text-center text-slate-500">
                        No threads yet.
                      </i>
                    )}
                  </div>
                  {topic.threads && topic.threads.length > 0 && (
                    <div>
                      <span>
                        {new Date(
                          topic.threads[0].post_date,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="ml-3 text-slate-200 transition-colors hover:text-indigo-400">
                        <Link
                          href={`/forum/users?user_id=${topic.threads[0].user_id}`}
                        >
                          {topic.threads[0].user_name}
                        </Link>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Forums;

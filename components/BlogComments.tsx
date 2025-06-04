"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddComment from "@/components/AddComment";
import Link from "next/link";

interface CommentData {
  id: number;
  blog_slug: string;
  user_id: number;
  username: string;
  avatar: string;
  content: string;
  created_at: string;
}

interface BlogCommentsProps {
  slug: string;
}

const BlogComments: React.FC<BlogCommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://www.the-still-river.com/api/forum/comments.php?slug=${slug}&page=${page}`,
    );
    const data = await res.json();
    setComments(data);
    setIsLoading(false);
  }, [slug, page]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="m-auto mb-12 mt-8 w-[95%] max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold text-slate-200">Comments</h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="grid grid-cols-[auto_1fr] gap-4 border-t border-white/25 py-4"
        >
          <Image
            src={`https://www.the-still-river.com/img/forum/avatars/${comment.avatar == "0" ? "0" : comment.user_id}.jpg`}
            alt={comment.username}
            width={64}
            height={64}
            className="h-10 w-10 rounded-full md:h-16 md:w-16"
          />
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Link href={`/forum/users/?user_id=${comment.user_id}`}
                className="font-bold text-slate-200 transition-colors hover:text-indigo-400">
                {comment.username}
              </Link>
              <p className="text-sm text-slate-400">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="prose prose-invert mt-2 !max-w-none">
              <Markdown remarkPlugins={[remarkGfm]}>{comment.content}</Markdown>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="rounded bg-slate-800 px-3 py-1 text-slate-200 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={comments.length < 10}
          className="rounded bg-slate-800 px-3 py-1 text-slate-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <AddComment slug={slug} onCommentSubmit={fetchComments} />
    </div>
  );
};

export default BlogComments;

import React, { Suspense, useEffect, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import { MDXEditorMethods } from "@mdxeditor/editor";
import Editor from "@/components/Editor";

interface AddPostProps {
  thread_id: string | null;
  onPostSubmit: () => void;
}

interface User {
  username: string;
  id: number;
}

const AddPost: React.FC<AddPostProps> = ({ thread_id, onPostSubmit }) => {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://www.the-still-river.com/api/forum/user.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser(data);
        }
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let message = mdxEditorRef.current?.getMarkdown() || "";

    const response = await fetch(
      "https://www.the-still-river.com/api/forum/post.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, thread_id }),
        credentials: "include",
      },
    );

    if (response.ok) {
      onPostSubmit();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mt-8 rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="post" className="text-xl font-bold text-slate-200">
          Reply
        </label>
        <Suspense>
          <Editor markdown={""} editorRef={mdxEditorRef} />
        </Suspense>
        <div className="flex w-full justify-end">
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-teal-600 px-3 py-2 font-bold text-teal-100 transition-colors hover:bg-teal-700 hover:text-teal-200 sm:w-auto sm:px-5"
          >
            <p>Reply</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;

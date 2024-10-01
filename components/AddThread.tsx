import React, { useEffect, useState, Suspense, useRef } from "react";
import "@mdxeditor/editor/style.css";
import { MDXEditorMethods } from "@mdxeditor/editor";
import Editor from "@/components/Editor";

interface AddThreadProps {
  topic_id: string | null;
}

interface User {
  username: string;
  id: number;
}

const AddThread: React.FC<AddThreadProps> = ({ topic_id }) => {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

    let markdown = mdxEditorRef.current?.getMarkdown() || "";
    setContent(markdown);

    const response = await fetch(
      "https://www.the-still-river.com/api/forum/thread.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: markdown, topic_id }),
        credentials: "include",
      },
    );

    if (response.ok) {
      setTitle("");
      const data = await response.json();
      const thread_id = data.thread_id;
      window.location.href = `/forum/thread/?thread_id=${thread_id}`;
    }
  };

  if (!user) {
    return (
      <p className="text-slate-400">Please log in to create a new thread.</p>
    );
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <label htmlFor="title" className="text-xl font-bold text-slate-200">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label htmlFor="content" className="text-xl font-bold text-slate-200">
        Content
      </label>
      <Suspense>
        <Editor markdown={content} editorRef={mdxEditorRef} />
      </Suspense>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="mb-3 flex w-full justify-center rounded bg-teal-600 px-3 py-2 font-bold text-teal-100 transition-colors hover:bg-teal-700 hover:text-teal-200 sm:w-auto sm:px-5"
        >
          <p>Create Thread</p>
        </button>
      </div>
    </form>
  );
};

export default AddThread;

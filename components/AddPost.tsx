import React, { useState } from "react";

interface AddPostProps {
  thread_id: string | null;
}

const AddPost: React.FC<AddPostProps> = ({ thread_id }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      setMessage("");
    }
  };

  return (
    <div className="mt-8 rounded-xl bg-slate-950/70 p-6 pb-2 shadow-lg">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="post" className="text-xl font-bold text-slate-200">
          Reply
        </label>
        <textarea
          name="message"
          className="h-48 rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
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

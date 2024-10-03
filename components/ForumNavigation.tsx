import Link from "next/link";
import React from "react";

interface ForumNavigationProps {
  active?: "Message Board" | "What's New" | "Resources" | "Users";
}

const ForumNavigation: React.FC<ForumNavigationProps> = ({
  active = "Message Board",
}) => {
  return (
    <ul className="no-scrollbar mx-4 flex max-w-[100%] overflow-x-scroll text-slate-400">
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "Message Board"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        <Link href="/forum/">Message Board</Link>
      </li>
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "What's New"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        What&apos;s New
      </li>
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "Resources"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        Resources
      </li>
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "Users"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        <Link href="/forum/users">Users</Link>
      </li>
      <li className="flex-grow justify-center border-b border-slate-400 pb-2"></li>
    </ul>
  );
};

export default ForumNavigation;

import React from "react";

interface UserNavigationProps {
  active?: "Profile Posts" | "Recent Activity" | "About";
}

const UserNavigation: React.FC<UserNavigationProps> = ({
  active = "Profile Posts",
}) => {
  return (
    <ul className="no-scrollbar mx-4 flex max-w-[100%] overflow-x-scroll text-slate-400">
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "Profile Posts"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        Profile Posts
      </li>
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "Recent Activity"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        Recent Activity
      </li>
      <li
        className={`flex w-44 flex-shrink-0 justify-center pb-2 ${
          active === "About"
            ? "border-b-2 border-indigo-400 text-indigo-400"
            : "border-b border-slate-400"
        }`}
      >
        About
      </li>
      <li className="flex-grow justify-center border-b border-slate-400 pb-2"></li>
    </ul>
  );
};

export default UserNavigation;

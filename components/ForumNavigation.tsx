import React from "react";

const ForumNavigation = () => {
  return (
    <ul className="no-scrollbar mx-4 flex max-w-[100%] overflow-x-scroll text-slate-400">
      <li className="flex w-44 flex-shrink-0 justify-center border-b-2 border-indigo-400 pb-2 text-indigo-400">
        Message Board
      </li>
      <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">{`What\'s New`}</li>
      <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">
        Resources
      </li>
      <li className="flex w-44 flex-shrink-0 justify-center border-b border-slate-400 pb-2">
        Users
      </li>
      <li className="flex-grow justify-center border-b border-slate-400 pb-2"></li>
    </ul>
  );
};

export default ForumNavigation;

import { title } from "process";
import React from "react";

interface UserForumTagProps {
  role: string;
}

const UserForumTag: React.FC<UserForumTagProps> = ({ role }) => {
  const getColors = (role: string) => {
    switch (role) {
      case "user":
        return {
          backgroundColor: "bg-indigo-300",
          textColor: "text-indigo-800",
          title: "Member",
        };
      case "Inactive":
        return {
          backgroundColor: "bg-slate-300",
          textColor: "text-slate-800",
          title: "Inactive",
        };
      case "admin":
        return {
          backgroundColor: "bg-red-300",
          textColor: "text-red-800",
          title: "Admin",
        };
      case "moderator":
        return {
          backgroundColor: "bg-green-300",
          textColor: "text-green-800",
          title: "Moderator",
        };
      default:
        return {
          backgroundColor: "bg-slate-300",
          textColor: "text-slate-800",
          title: "Inactive",
        };
    }
  };

  const { backgroundColor, textColor, title } = getColors(role);

  return (
    <span className={`${backgroundColor} ${textColor} rounded-full px-4 py-1`}>
      {title}
    </span>
  );
};

export default UserForumTag;

import { TEAM } from "@/content/team";

export const getTeamMemberData = (name: string) => {
  return TEAM.find((member) => member.name === name);
};

const tagDict: { [key: string]: { textColor: string; bgColor: string } } = {
  "Data Science": { textColor: "text-indigo-800", bgColor: "bg-indigo-200" },
  "Machine Learning": { textColor: "text-cyan-800", bgColor: "bg-cyan-200" },
  News: { textColor: "text-amber-800", bgColor: "bg-amber-200" },
};

export function getTagColors(tag: string): {
  textColor: string;
  bgColor: string;
} {
  return (
    tagDict[tag] || { textColor: "text-slate-800", bgColor: "bg-slate-200" }
  );
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function clipPostContent(content: string): string {
  const maxLength = 200;
  if (content.length > maxLength) {
    return content.slice(0, maxLength) + "...";
  }
  return content;
}

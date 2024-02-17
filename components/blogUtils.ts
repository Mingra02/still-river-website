const authorDict: { [key: string]: { image: string; role: string } } = {
  "Michael Ingram": {
    image: "/blog/img/michael-ingram.jpg",
    role: "Data Scientist",
  },
  "Ting Guo": { image: "/blog/img/ting-guo.jpg", role: "Data Scientist" },
};

export function getAuthorTitle(authorName: string): {
  image: string;
  role: string;
} {
  return authorDict[authorName] || { image: "", role: "" };
}

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
  const date = new Date(dateString);
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

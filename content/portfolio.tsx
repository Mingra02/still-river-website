export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const PORTFOLIO = [
  {
    title: "EasyTunes",
    description:
      "EasyTunes is a generative model for creating simple music tracks. It is designed to work on consumer grade hardware and can create a song in less than a minute and a half on just a CPU.",
    image: "/img/easytunes.webp",
    link: "https://github.com/Still-River/easytunes",
  },
  {
    title: "Goodbytes",
    description:
      "Goodbytes is recipe generation model which takes a string of ingredients as input and generates a full recipe as output.",
    image: "/img/goodbytes.webp",
    link: "https://github.com/Still-River/goodbytes",
  },
];

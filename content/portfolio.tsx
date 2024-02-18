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
    link: "https://www.github.com/",
  },
  {
    title: "Budget Pro",
    description:
      "Budget Pro is an advanced budgeting app that creates budgets based on the user’s income, calculates tax withholding, loan payoffs, and more.",
    image: "/img/budgetpro.webp",
    link: "https://www.github.com/",
  },
];

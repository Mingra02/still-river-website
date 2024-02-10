import {
  faBook,
  faBoxesStacked,
  faBriefcase,
  faChartLine,
  faComments,
  faEnvelope,
  faImages,
  faLaptopCode,
  faNewspaper,
  faRobot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export const PAGES = [
  { href: "/blog/", label: "Blog", icon: faNewspaper },
  { href: "/forum/", label: "Forum", icon: faComments },
  { href: "/portfolio/", label: "Portfolio", icon: faBriefcase },
  { href: "/about/", label: "About", icon: faUserGroup },
  { href: "/contact/", label: "Contact Us", icon: faEnvelope },
];

export const SKILLS = [
  {
    icon: faBook,
    title: "Natural Language Processing",
    description:
      "Transform your textual data into actionable insights from sentiment analysis to chatbots.",
  },
  {
    icon: faRobot,
    title: "Machine Learning",
    description:
      "Automate processes, uncovers hidden trends, and creates systems that evolve with your business.",
  },
  {
    icon: faChartLine,
    title: "Predictive Analytics",
    description:
      "Stay ahead of the curve by using historical data to forecast future trends.",
  },
  {
    icon: faLaptopCode,
    title: "Statistical Analysis",
    description:
      "Find the story behind the numbers. Discover trends, test hypotheses, and validate strategies.",
  },
  {
    icon: faImages,
    title: "Data Visualization",
    description:
      "Let your data come to life. Convert complex datasets into clear, engaging, and intuitive visuals.",
  },
  {
    icon: faBoxesStacked,
    title: "Database Management",
    description:
      "Ensure your data is stored safely and optimized for easy accessibility and analysis.",
  },
];

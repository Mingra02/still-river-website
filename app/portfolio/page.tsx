import React from "react";
import { PORTFOLIO, Project } from "@/content/portfolio";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | The Still River",
  description:
    "Check out some of our successful projects and see what we can do for you.",
};

const PortfolioItem = ({ project }: { project: Project }) => {
  return (
    <div className="m-auto mt-12 grid max-w-sm grid-cols-1 place-items-center justify-center gap-5 md:mt-24 md:max-w-4xl md:grid-cols-[auto_1fr] md:gap-12">
      <Image
        src={project.image}
        alt={project.title}
        height={512}
        width={512}
        className="h-60 w-72 rounded-xl"
      />
      <div className="ma-auto relative h-full w-full">
        <h3 className="text-xl font-semibold text-slate-200">
          {project.title}
        </h3>
        <p className="mt-4 text-slate-400">{project.description}</p>
        <div className="align-center mt-4 grid w-full grid-cols-2 md:absolute md:bottom-2">
          <Link href={project.link} target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              icon={faGithub}
              className="fa-2xl text-slate-400 transition-colors hover:text-indigo-400"
            />
          </Link>
          <Link href={project.link} target="_blank" rel="noreferrer">
            <p className="text-right font-semibold text-slate-400 transition-colors hover:text-indigo-400">
              Learn More
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute -top-[10%] left-0 right-0 isolate -z-10 m-auto h-full w-screen overflow-visible overflow-x-clip lg:-top-[35%] lg:mb-0">
          <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
          <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
          <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
          <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
          <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
          <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
        </div>
      </div>
      <section className="m-auto mb-6 mt-20 grid w-[95%] max-w-6xl md:mt-32">
        <h1 className="text-3xl font-bold text-slate-100 md:text-5xl">
          Our Portfolio
        </h1>
        <p className="mt-4 text-slate-400">
          Below are just a few of our many successful projects.
        </p>
        <div className="m-auto mb-6 w-full md:mb-32">
          {PORTFOLIO.map((project, index) => (
            <PortfolioItem key={index} project={project} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Portfolio;

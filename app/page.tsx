"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Button from "@/components/Button";
import TertiaryButton from "@/components/TertiaryButton";
import Skill from "@/components/Skill";
import { SKILLS } from "@/content/content";
import PortfolioCard from "@/components/PortfolioCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeroImage from "@/public/img/hero.webp";
import EasyTunes from "@/public/img/easytunes.webp";
import BudgetPro from "@/public/img/budgetpro.webp";

import { PORTFOLIO } from "@/content/portfolio";

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="max-w-full overflow-clip">
        <div className="relative m-auto h-[85vh] max-w-full">
          <div className="absolute inset-0 -z-20 -mt-16 h-full object-cover brightness-[40%]">
            <Image
              src={HeroImage}
              alt="The Still River"
              fill
              placeholder="blur"
              priority={true}
            />
          </div>
          <div className="absolute inset-0 -z-20 -mt-16 max-w-full overflow-hidden bg-slate-950 opacity-80 mix-blend-color"></div>
          <div className="absolute inset-0 -z-20 -mt-16 max-w-full overflow-hidden bg-gradient-radial from-slate-950/0 to-slate-950/100"></div>
        </div>
        <div className="absolute inset-0 m-auto max-w-screen-2xl">
          <h1 className="m-auto mt-[25vh] text-center text-2xl font-bold text-slate-100 sm:text-5xl md:text-7xl xl:mt-[40vh] ">
            Where Data Meets Strategy
          </h1>
          <p className="text-md m-auto mt-4 px-4 text-center text-slate-300 md:text-lg">
            Unleash the power of your data with our expert analysis and bespoke
            solutions
          </p>
          <div className="m-auto mt-20 flex w-full items-center justify-center gap-4 text-center lg:mt-32">
            <Link href="/contact">
              <Button text="Contact Us" />
            </Link>
            <Link href="/portfolio">
              <TertiaryButton
                text="Our Portfolio"
                icon={faArrowRight}
                iconPlacement="right"
              />
            </Link>
          </div>
          <div
            className={`pointer-events-none absolute bottom-0 m-auto flex w-full justify-center text-center transition-opacity duration-1000 ${hasScrolled ? "opacity-0" : "opacity-100"}`}
          >
            <FontAwesomeIcon
              height={24}
              width={24}
              icon={faArrowDown}
              className="mt-16 block animate-bounce rounded-full border border-slate-800/80 bg-slate-800/30 px-4 py-3 text-slate-300"
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        className={`transition-all duration-1000 ${hasScrolled ? "-mt-16 opacity-100" : "mt-20 opacity-0"}`}
      >
        <div className="relative w-screen max-w-full overflow-x-clip">
          <div className="absolute -top-20 left-[10%] -z-10 h-[500px] w-[500px] transform overflow-x-clip bg-gradient-radial from-slate-800/100 to-slate-800/0 xl:left-[25%]"></div>
          <div className="absolute right-[15%] top-[900px] -z-10 h-[700px] w-[700px] translate-x-48 transform overflow-x-clip bg-gradient-radial from-slate-800/100 to-slate-950/0 md:top-[400px] lg:top-[220px] xl:right-[25%]"></div>
        </div>
        <div className="m-auto max-w-7xl">
          <h2 className="m-auto w-full text-center text-4xl font-semibold text-slate-100 md:mb-12">
            Our Services
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((skill, index) => (
              <Skill
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative m-auto mt-24 max-w-7xl lg:mb-24 lg:mt-48">
        <h2 className="m-auto mb-12 w-full text-center text-4xl font-semibold text-slate-100 xl:mb-24">
          Our Portfolio
        </h2>
        <div className="grid grid-cols-1 gap-12 px-8 lg:grid-cols-2 xl:gap-24">
          {PORTFOLIO.slice(0, 2).map((project, index) => (
            <PortfolioCard
              key={index}
              imgSrc={project.image}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </section>
    </>
  );
}

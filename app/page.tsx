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

import HeroImage from "@/public/img/hero.png";
import EasyTunes from "@/public/img/easytunes.jpg";
import BudgetPro from "@/public/img/budgetpro.jpg";

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
      <div className="relative m-auto h-[85vh] w-full">
        <Image
          src={HeroImage}
          alt="The Still River"
          fill
          placeholder="blur"
          priority={true}
          className="absolute inset-0 -z-20 -mt-16 h-full w-full object-cover brightness-[40%]"
        />
        <div className="absolute inset-0 -z-20 -mt-16 bg-slate-950 opacity-80 mix-blend-color"></div>
        <div className="absolute inset-0 -z-20 -mt-16 bg-gradient-radial from-slate-950/0 to-slate-950/100"></div>
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
      </div>
      <section
        className={`relative m-auto max-w-7xl transition-all duration-1000 ${hasScrolled ? "-mt-16 opacity-100" : "mt-20 opacity-0"}`}
      >
        <div className="absolute -left-48 -top-20 -z-10 h-[500px] w-[500px] bg-gradient-radial from-slate-800/100 to-slate-800/0"></div>
        <div className="absolute -right-48 bottom-36 -z-10 h-[700px] w-[700px] bg-gradient-radial from-slate-800/100 to-slate-950/0 md:bottom-0 lg:-bottom-48"></div>
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
      </section>
      <section className="relative m-auto mt-24 max-w-7xl lg:mb-24 lg:mt-48">
        <h2 className="m-auto mb-12 w-full text-center text-4xl font-semibold text-slate-100 xl:mb-24">
          Our Portfolio
        </h2>
        <div className="grid grid-cols-1 gap-12 px-8 lg:grid-cols-2 xl:gap-24">
          <PortfolioCard
            imgSrc={EasyTunes}
            title="EasyTunes"
            description="EasyTunes is a generative music model for creating simple music
          tracks. It is designed to work on consumer-grade hardware and can
          create a song in less than a minute and a half on just a CPU."
          />
          <PortfolioCard
            imgSrc={BudgetPro}
            title="BudgetPro"
            description="BudgetPro is an advanced budgeting app that creates budgets based on the user's income, calculates tax witholdings, loan payoffs, and more."
          />
        </div>
      </section>
    </>
  );
}

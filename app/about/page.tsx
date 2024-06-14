import Image from "next/image";
import AboutImage1 from "../../public/img/about1.webp";
import AboutImage2 from "../../public/img/about2.webp";
import AboutImage3 from "../../public/img/about3.webp";
import AboutImage4 from "../../public/img/about4.webp";
import JoinOurTeam from "../../public/img/join_our_team.webp";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faL,
} from "@fortawesome/free-solid-svg-icons";

import { TEAM } from "@/content/team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Still River",
  description:
    "We believe in harnessing the transformative power of data science to drive innovation and efficiency. Our team of dedicated professionals is committed to delivering bespoke solutions that cater to your unique business challenges.",
};

interface ValueProps {
  title: string;
  description: string;
}

const Value: React.FC<ValueProps> = ({ title, description }) => {
  return (
    <div className="m-auto mt-0 max-w-lg">
      <h3 className="text-xl font-bold text-slate-200">{title}</h3>
      <p className="mt-4 text-slate-400">{description}</p>
    </div>
  );
};

export default function About() {
  return (
    <>
      <section className="m-auto -mb-6 mt-20 grid max-w-7xl grid-cols-1 gap-8 overflow-clip px-8 sm:mt-32 lg:mb-16 lg:grid-cols-2 lg:overflow-visible">
        <div>
          <h2 className="m-auto max-w-lg text-3xl font-bold text-slate-200 lg:text-5xl">
            Enhancing the power of data through bespoke solutions
          </h2>
          <p className="m-auto mt-6 max-w-lg text-slate-400">
            We believe in harnessing the transformative power of data science to
            drive innovation and efficiency. Our team of dedicated professionals
            is committed to delivering bespoke solutions that cater to your
            unique business challenges.
          </p>
        </div>
        <div className="overflow-none m-auto mb-48 mt-12 grid h-48 max-w-sm -translate-x-[100px] grid-cols-2 gap-4 lg:-translate-x-[40px] lg:translate-y-[80px] xl:mb-64 xl:-translate-x-[100px]">
          <Image
            src={AboutImage1}
            alt="Making Plans"
            className="translate-x-5 translate-y-1 scale-125 rounded-xl shadow-lg drop-shadow-xl transition-all duration-500 hover:rotate-6"
            placeholder="blur"
          />
          <Image
            src={AboutImage2}
            alt="Discussing Results"
            className="translate-x-[250px] translate-y-[30px] scale-[1.7] rounded-xl shadow-lg drop-shadow-xl transition-all duration-500 hover:rotate-6"
            placeholder="blur"
          />
          <Image
            src={AboutImage3}
            alt="Coding Dashboards"
            className="-translate-x-[45px] translate-y-[65px] scale-[1.3] rounded-xl shadow-lg drop-shadow-xl transition-all duration-500 hover:rotate-6"
            placeholder="blur"
          />
          <Image
            src={AboutImage4}
            alt="Presenting Insights"
            className="translate-x-[10px] translate-y-[0px] scale-[1.75] rounded-xl shadow-lg drop-shadow-xl transition-all duration-500 hover:rotate-6"
            placeholder="blur"
          />
        </div>
      </section>
      <section className="m-auto grid max-w-7xl grid-cols-1 px-8 md:grid-cols-2">
        <div className="m-auto max-w-lg">
          <h2 className="text-3xl font-bold text-slate-200">Our Mission</h2>
          <p className="mt-6 text-slate-400">
            {`Our mission is to empower businesses through the transformative
            power of data science. We are dedicated to turning complex data into
            actionable insights, enabling our clients to make smarter,
            data-driven decisions. By leveraging cutting-edge technologies and
            innovative methodologies, we strive to unveil hidden opportunities
            and solve the most intricate challenges faced by businesses in the
            digital era. Our approach is grounded in a deep understanding of
            both the technical and strategic aspects of data science, ensuring
            that our solutions are not only advanced but also pragmatic and
            aligned with our clients' unique business objectives.`}
          </p>
          <p className="mt-6 text-slate-400">
            {`We are committed to excellence, integrity, and collaboration in
            every aspect of our work. Our goal is to be more than just a service
            provider; we aim to be a trusted partner in our clients' journey
            towards growth and success. Whether it's through predictive
            analytics, machine learning, or custom data applications, we are
            dedicated to delivering results that drive efficiency, innovation,
            and competitive advantage. At The Still River, we believe that the
            right data, analyzed in the right way, can unlock endless
            possibilities and propel businesses to new heights.`}
          </p>
        </div>
        <div className="align-items-start m-auto mt-12 grid w-full max-w-lg grid-cols-1 grid-rows-3 gap-10 md:mx-auto md:w-auto">
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-slate-200">5 Years</h3>
            <p className="text-slate-400">Practicing Data Science</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-slate-200">100%</h3>
            <p className="text-slate-400">Customer Satisfaction</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-3xl font-bold text-slate-200">{"> 10"}</h3>
            <p className="text-slate-400">
              Successful Projects and Applications
            </p>
          </div>
        </div>
      </section>
      <section className="m-auto mb-6 mt-20 grid max-w-7xl grid-cols-2 px-8 md:mt-28 lg:pb-16 xl:mb-24">
        <h2 className="col-span-2 m-auto mt-0 w-full max-w-lg text-3xl font-bold text-slate-200 md:col-span-1">
          Our Values
        </h2>
        <div className="col-span-2 row-start-2 mt-8 grid w-full grid-cols-1 gap-12 align-top md:mx-auto md:w-auto md:grid-cols-2 lg:grid-cols-3 xl:mt-16 xl:gap-y-20 xl:pl-12">
          <Value
            title="Innovation"
            description="Constantly pushing the boundaries of data science to bring forth novel solutions that redefine the standards of efficiency and effectiveness in our clients' industries."
          />
          <Value
            title="Integrity"
            description="Maintaining the highest ethical standards, ensuring transparency and honesty in every project, and fostering trust through our unwavering commitment to doing what's right."
          />
          <Value
            title="Collaboration"
            description="Believing in the power of synergy, we work closely with our clients and within our team to blend ideas and expertise for superior results."
          />
          <Value
            title="Excellence"
            description="Pursuing the highest quality in every aspect of our work, from analysis to execution, ensuring that we deliver only the best to our clients."
          />
          <Value
            title="Client Focus"
            description={
              "Prioritizing our clients’ needs and goals, we tailor our approaches to align with their specific challenges and objectives, ensuring personalized and effective solutions."
            }
          />
          <Value
            title="Adaptability"
            description="Embracing the dynamic nature of technology and business, we remain agile and responsive to the evolving needs of our clients and the market, ensuring relevance and resilience in all our solutions."
          />
        </div>
      </section>
      <section className="m-auto w-full max-w-7xl" id="team">
        <h3 className="pl-8 text-3xl font-bold text-slate-200 xl:pl-20">
          Our Team
        </h3>
        <div className="m-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, index) => (
            <div key={index} className="m-auto h-full max-w-xs">
              <Link
                href={
                  member.url === "open-position"
                    ? "/careers/"
                    : `/team/${member.url}`
                }
              >
                <Image
                  src={member.image}
                  alt={`Image of ${member.name}`}
                  width={320}
                  height={320}
                  className="rounded-lg shadow-lg brightness-75 drop-shadow-lg"
                />
              </Link>
              <Link
                href={
                  member.url === "open-position"
                    ? "/careers/"
                    : `/team/${member.url}`
                }
              >
                <h4 className="mt-4 text-xl font-bold text-slate-200 transition-colors hover:text-indigo-500">
                  {member.name}
                </h4>
              </Link>
              <p className="mtext-sm text-slate-400">{member.role}</p>
              <p className="mt-4 text-slate-400">{member.short_description}</p>

              <div className="mt-4 flex items-center justify-start gap-5">
                {member.social_links &&
                  member.social_links.map((social, index) => {
                    return (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 transition-colors hover:text-indigo-400"
                      >
                        <FontAwesomeIcon icon={social.icon} className="fa-xl" />
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="relative h-full w-full">
        <div className="absolute -top-[10%] left-0 right-0 isolate -z-10 m-auto h-full w-screen overflow-visible overflow-x-clip lg:-top-[35%] lg:mb-0">
          <div className="absolute -left-48 -top-20 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-rose-600/25 to-slate-950/0 xl:left-[15%] xl:top-0"></div>
          <div className="absolute -left-24 top-[30%] -z-10 h-[725px] w-[725px] bg-gradient-radial from-fuchsia-800/25 to-slate-950/0 xl:left-[20%]"></div>
          <div className="absolute left-24 top-16 -z-10 h-[630px] w-[630px] bg-gradient-radial from-indigo-950/90 to-slate-950/0 xl:left-[30%]"></div>
          <div className="absolute right-48 top-64 isolate -z-10 h-[500px] w-[500px] bg-gradient-radial from-blue-800/35 to-slate-950/0 xl:left-[50%]"></div>
          <div className="absolute right-0 top-0 -z-10 h-[350px] w-[350px] bg-gradient-radial from-sky-600/45 to-slate-950/0 xl:left-[63%]"></div>
          <div className="absolute -right-24 top-96 -z-10 h-[250px] w-[250px] bg-gradient-radial from-teal-700/45 to-slate-950/0 xl:left-[70%]"></div>
        </div>
        <section className="relative m-auto my-36 grid w-full max-w-2xl grid-cols-1 place-items-center justify-center overflow-visible rounded-xl border border-white/10 bg-white/5 p-10 shadow-md drop-shadow-md backdrop-blur-md lg:max-w-6xl lg:grid-cols-[auto_1fr] lg:place-items-start lg:justify-start lg:gap-16">
          <Image
            src={JoinOurTeam}
            width={350}
            alt="Hands in the middle of a huddle."
            className="h-[300px] rounded-lg object-cover text-center shadow-md"
            placeholder="blur"
          />
          <div>
            <h2 className="mt-4 w-full text-center text-3xl font-bold text-slate-200 lg:mt-0 lg:text-left">
              Join our team
            </h2>
            <p className="mt-4 text-slate-300">
              Join our dynamic team and turn your passion for data science into
              a rewarding career.
            </p>
            <ul className="mb-14 mt-6 grid w-full grid-cols-1 gap-x-2 gap-y-3 font-semibold sm:grid-cols-2 sm:gap-y-6">
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">
                  Competitive Salaries
                </span>
              </li>
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">Flexible Work Hours</span>
              </li>
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">
                  Professional Development
                </span>
              </li>
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">
                  Health and Wellness Benefits
                </span>
              </li>
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">
                  Collaborative Work Environment
                </span>
              </li>
              <li className="text-slate-300">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-slate-300"
                />
                <span className="ml-4 text-slate-300">
                  Opportunities for Growth
                </span>
              </li>
            </ul>
            <Link href="/careers">
              <p className="absolute bottom-10 right-10 font-bold text-indigo-400 transition-colors hover:text-indigo-500">
                See our job opportunities
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

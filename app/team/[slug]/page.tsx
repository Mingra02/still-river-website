import React from "react";
import { TEAM } from "@/content/team";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const team_member = TEAM.find((member) => member.url === slug);

  if (!team_member) {
    throw new Error("Team member not found");
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${team_member.name} | The Still River`,
    openGraph: {
      images: [team_member.image, ...previousImages],
      description: team_member.short_description,
      url: `https://www.the-still-river.com/team/${slug}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      site: "@stillriverdev",
      creator: "@stillriverdev",
      title: team_member.name + " | The Still River",
      description: team_member.short_description,
      images: team_member.image,
    },
  };
}

export default function TeamMember(props: any) {
  const slug = props.params.slug;
  const team_member = TEAM.find((member) => member.url === slug);

  if (!team_member) {
    return <div className="text-xl text-slate-200">Team member not found</div>;
  }

  if (team_member.url === "open-position") {
    return (
      <section className="m-auto mb-6 mt-20 grid w-[95%] max-w-6xl grid-cols-1 gap-8 rounded-lg px-4 sm:mt-32 sm:px-10 lg:mb-16 lg:grid-cols-[auto_1fr]">
        <div className="text-xl text-slate-200">
          {`This is currently an open position. If you'd like to apply, please go to the `}
          <Link
            href="/careers/"
            className="text-indigo-400 transition-colors hover:text-indigo-500"
          >
            careers page
          </Link>
          .
        </div>
      </section>
    );
  }

  return (
    <>
      <Head>
        <title key="title">{team_member.name} | Still River</title>
        <meta
          name="description"
          content={team_member.short_description}
          key="description"
        />
        <meta
          property="og:title"
          content={`${team_member.name} | Still River`}
        />
        <meta
          property="og:description"
          content={team_member.short_description}
        />
        <meta property="og:image" content={team_member.image} />
        <meta
          property="og:url"
          content={`https://stillriver.dev/team/${team_member.url}`}
        />
        <meta property="og:type" content="profile" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@stillriverdev" />
        <meta name="twitter:creator" content="@stillriverdev" />
        <meta
          name="twitter:title"
          content={`${team_member.name} | Still River`}
        />
        <meta
          name="twitter:description"
          content={team_member.short_description}
        />
        <meta name="twitter:image" content={team_member.image} />
      </Head>
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
      <section className="m-auto mb-6 mt-20 grid w-[95%] max-w-6xl grid-cols-1 gap-8 rounded-lg px-4 sm:mt-32 sm:px-10 lg:mb-16 lg:grid-cols-[auto_1fr]">
        <div>
          <div className="flex items-center">
            <Image
              src={team_member.image}
              alt={team_member.name}
              width={128}
              height={128}
              className="h-32 w-32 rounded-lg lg:hidden"
            />
            <div className="ml-4 grid w-full grid-cols-1 place-self-start lg:ml-0 lg:grid-cols-[1fr_auto]">
              <div>
                <h1 className="text-2xl font-bold text-slate-200 md:text-4xl">
                  {team_member.name}
                </h1>
                <p className="text-sm text-slate-400 sm:text-base">
                  {team_member.role}
                </p>
              </div>
              <div className="flex-start mt-4 flex flex-grow gap-4">
                {team_member.social_links.map((social, index) => {
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
          </div>
          <div className="mt-4 lg:mt-8">
            <h2 className="text-lg font-semibold text-slate-200">Summary</h2>
            <p className="mt-2 text-slate-400">
              {team_member.long_description}
            </p>
          </div>
          <div className="mt-4 lg:mt-8">
            <h2 className="-mb-4 text-lg font-semibold text-slate-200">
              Experience
            </h2>
            {team_member.experience.map((exp, index) => (
              <div key={index} className="mt-4 grid grid-cols-[1fr_auto]">
                <div>
                  <h3 className="font-semibold text-slate-200">{exp.title}</h3>
                  <i className="text-slate-400">{exp.company}</i>
                </div>
                <div>
                  <p className="text-right text-slate-400">{exp.dates}</p>
                </div>
                <div className="col-span-full text-slate-400">
                  <ul className="ml-4 mt-4 list-disc">
                    {exp.bullets.map((bullet, index) => (
                      <li key={index} className="mt-2">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {team_member.certifications.length > 0 && (
            <div className="mt-6 hidden lg:mt-8 lg:block">
              <h2 className="-mb-2 text-lg font-semibold text-slate-200">
                Certifications
              </h2>
              <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-12 lg:mt-8">
                {team_member.certifications.map((cert, index) => (
                  <Link href={cert.link} key={index}>
                    <li
                      key={index}
                      className="mt-2 text-slate-200 transition-colors hover:text-indigo-400"
                    >
                      <div className="flex w-full justify-center">
                        <Image
                          src={cert.img}
                          alt={cert.name}
                          width={128}
                          height={128}
                        />
                      </div>
                      <p className="mt-3 font-semibold">{cert.name}</p>
                      <i className="block text-sm text-slate-400">
                        {cert.issuer}
                      </i>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full lg:order-first lg:w-screen lg:max-w-xs">
          <Image
            src={team_member.image}
            alt={team_member.name}
            width={256}
            height={256}
            className="hidden h-64 w-64 rounded-lg lg:block"
          />
          <div className="w-full">
            <h2 className="-mb-2 text-lg font-semibold text-slate-200 lg:mt-4">
              Education
            </h2>
            <ul>
              {team_member.education.map((education, index) => (
                <li
                  key={index}
                  className="mt-2 grid w-full grid-cols-[1fr_auto] lg:grid-cols-1"
                >
                  <div>
                    <h3 className="text-base font-semibold text-slate-200">
                      {education.degree}
                    </h3>
                    <i className="block text-sm text-slate-400">
                      {education.school}
                    </i>
                  </div>
                  <i className="block text-sm text-slate-400">
                    {education.dates}
                  </i>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 lg:mt-8">
            <h2 className="-mb-6 text-lg font-semibold text-slate-200">
              Skills
            </h2>
            <ul className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {team_member.skills.map((skill, index) => (
                <li key={index} className="mt-6">
                  <h3 className="font-semibold text-slate-200">
                    {skill.group_name}
                  </h3>
                  <ul>
                    {skill.skills.map((skill, index) => (
                      <li key={index} className="text-sm text-slate-400">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          {team_member.certifications.length > 0 && (
            <div className="mt-6 lg:mt-8 lg:hidden">
              <h2 className="-mb-2 text-lg font-semibold text-slate-200">
                Certifications
              </h2>
              <ul className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-12 lg:mt-8">
                {team_member.certifications.map((cert, index) => (
                  <Link href={cert.link} key={index}>
                    <li
                      key={index}
                      className="mt-2 text-slate-200 transition-colors hover:text-indigo-400"
                    >
                      <div className="flex w-full justify-center">
                        <Image
                          src={cert.img}
                          alt={cert.name}
                          width={128}
                          height={128}
                        />
                      </div>
                      <p className="mt-3 font-semibold">{cert.name}</p>
                      <i className="block text-sm text-slate-400">
                        {cert.issuer}
                      </i>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const generateStaticParams = async () => {
  const team_members = TEAM;
  return team_members.map((member) => ({
    slug: member.url,
  }));
};

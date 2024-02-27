import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

type LinkProps = {
  text: string;
  href: string;
};

const FooterLinkGroup = ({
  title,
  links,
}: {
  title: string;
  links: LinkProps[];
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-slate-200">{title}</h3>
      {links.map((link, index) => (
        <Link
          key={index}
          className="text-slate-400 hover:text-slate-300"
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

const Newsletter = () => {
  return (
    <div className="col-span-2 flex max-w-md flex-col lg:col-start-3 lg:row-start-1 lg:row-end-3 lg:h-full lg:w-full lg:place-self-end xl:col-span-3 xl:col-start-5">
      <h3 className="font-bold text-slate-200">Subscribe to our newsletter</h3>
      <p className="text-slate-300">
        Receive news, blog posts, and more to your inbox.
      </p>
      <div className="mb-8 mt-4 block md:flex md:gap-6">
        <input
          type="text"
          placeholder="Enter your email"
          className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="mb-8 mt-4 flex w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-2 font-semibold text-indigo-100 transition duration-200 hover:bg-indigo-600 md:m-0 md:w-auto">
          Subscribe
        </button>
      </div>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="mx-10 mt-6 flex w-full max-w-sm justify-between px-10 text-4xl text-slate-700 lg:place-self-end lg:px-0">
      <Link href="http://www.facebook.com/">
        <FontAwesomeIcon icon={faFacebook} />
      </Link>
      <Link href="http://www.twitter.com/">
        <FontAwesomeIcon icon={faXTwitter} />
      </Link>
      <Link href="http://www.instagram.com/">
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link href="http://www.github.com/">
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link href="http://www.linkedin.com/">
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative m-auto mb-10 mt-8 w-screen max-w-7xl overflow-hidden text-slate-400">
      <div className="mx-10 h-0 border-t border-slate-600"></div>
      <div className="align-center lg:gap-y-p4 m-auto mx-10 mt-8 grid grid-cols-2 gap-8 px-3 lg:mb-8 lg:grid-cols-4 xl:mb-32 xl:grid-cols-7">
        <FooterLinkGroup
          title="Solutions"
          links={[
            { text: "Services", href: "/#services" },
            { text: "Portfolio", href: "/portfolio" },
            { text: "Contact Us", href: "/contact" },
          ]}
        />
        <FooterLinkGroup
          title="Community"
          links={[
            { text: "Blog", href: "/blog" },
            { text: "Forums", href: "/forum" },
          ]}
        />
        <FooterLinkGroup
          title="Company"
          links={[
            { text: "About", href: "/about" },
            { text: "Team", href: "/about#team" },
            { text: "Careers", href: "/careers" },
          ]}
        />
        <FooterLinkGroup
          title="Legal"
          links={[
            { text: "Privacy", href: "/privacy" },
            { text: "Terms", href: "/terms" },
          ]}
        />
        <Newsletter />
      </div>
      <div className="mx-10 h-0 border-t border-slate-600"></div>
      <div className="grid grid-cols-1 place-items-center lg:grid-cols-2 lg:place-items-start">
        <SocialLinks />
        <p className="mx-10 mt-6 flex items-center justify-center text-center text-sm text-slate-500 sm:text-left lg:order-first lg:items-end lg:justify-start lg:place-self-start lg:self-end">
          ©️ 2024 The Still River, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

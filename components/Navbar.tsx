"use client";

import { PAGES } from "@/content/content";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed z-10 w-screen">
        <div className="flex w-screen items-center justify-between bg-slate-950 pt-3">
          <div className="px-10">
            <Image
              src="/img/logo.png"
              width={40}
              height={40}
              alt="Still River"
            />
          </div>
          <div className="hidden max-w-xl flex-grow items-center justify-between md:flex">
            {PAGES.map((page) => (
              <Link
                href={page.href}
                key={page.label}
                className="basis-[150px] text-center text-slate-100 transition duration-300 hover:text-slate-300"
              >
                {page.label}
              </Link>
            ))}
          </div>
          <Link
            href="/login"
            className="hidden px-10 text-right text-slate-100 transition duration-300 hover:text-slate-300 md:block"
          >
            Log In
          </Link>
          <div
            className="block px-10 pt-3 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="fa-xl text-slate-200" />
          </div>
        </div>
        <div className="h-24 w-screen bg-gradient-to-b from-slate-950 to-slate-950/0"></div>
      </div>
      <div
        className={`fixed z-10 h-screen w-screen bg-slate-950/70 pt-3 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="absolute bottom-0 -z-10 h-full w-full opacity-20">
          <div className="heropattern-circuitboard-slate-100 absolute -z-10 h-full w-full"></div>
          <div className="absolute -z-10 h-full w-full bg-gradient-to-tl from-slate-950/0 via-slate-950 to-slate-950"></div>
        </div>
        <div className="z-10 h-full w-full">
          <div className="flex w-full justify-between px-10">
            <div className="flex items-center justify-center">
              <Image
                src="/img/logo.png"
                width={40}
                height={40}
                alt="Still River"
                className="inline"
              />
              <h2 className="ml-4 inline text-2xl font-semibold text-slate-200 transition duration-300 hover:text-indigo-400">
                The Still River
              </h2>
            </div>
            <FontAwesomeIcon
              icon={faX}
              className="fa-xl pt-3 text-slate-200"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <ul className="mt-10 flex w-full flex-col justify-center">
            {PAGES.map((page) => (
              <li key={page.label} className="m-auto w-full">
                <Link
                  href={page.href}
                  className="mx-14 my-3 block text-lg font-semibold text-slate-200 transition duration-300 hover:text-indigo-400"
                >
                  <FontAwesomeIcon icon={page.icon} className="mr-4" />
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

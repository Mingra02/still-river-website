"use client";

import { PAGES } from "@/content/content";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faX } from "@fortawesome/free-solid-svg-icons";

import LogoImage from "@/public/img/logo.png";

interface User {
  username: string;
  id: number;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://www.the-still-river.com/api/forum/user.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser(data);
        }
      });
  }, []);

  return (
    <>
      <div className="fixed top-0 z-20 w-screen overflow-clip">
        <div className="flex w-screen items-center justify-between bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/20 pt-3">
          <div className="px-10">
            <Link href="/">
              <Image
                src={LogoImage}
                width={40}
                height={40}
                alt="Still River"
                placeholder="blur"
              />
            </Link>
          </div>
          <div className="hidden max-w-xl flex-grow items-center justify-between md:flex">
            {PAGES.map((page) => (
              <Link
                href={page.href}
                key={page.label}
                className="basis-[150px] text-center text-slate-300 transition duration-300 hover:text-indigo-400"
              >
                {page.label}
              </Link>
            ))}
          </div>
          {user ? (
            <Link
              href="/api/forum/logout.php"
              className="hidden px-10 text-right text-slate-300 transition duration-300 hover:text-indigo-400 md:block"
            >
              <Image
                src={`/img/forum/avatars/${user.id}.jpg`}
                width={40}
                height={40}
                alt={user.username}
                className="inline rounded-full"
              />
            </Link>
          ) : (
            <Link
              href="/api/forum/auth.php"
              className="hidden px-10 text-right text-slate-300 transition duration-300 hover:text-indigo-400 md:block"
            >
              Log In
            </Link>
          )}
          <div
            className="block px-10 pt-3 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faBars} className="fa-xl text-slate-200" />
          </div>
        </div>
        <div className="h-8 w-screen bg-gradient-to-b from-slate-950/20 to-slate-950/0"></div>
      </div>
      <div
        className={`fixed top-0 z-20 h-screen w-screen bg-slate-950/70 pt-3 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="absolute bottom-0 -z-10 h-full w-full opacity-20">
          <div className="absolute -z-10 h-full w-full heropattern-circuitboard-slate-100"></div>
          <div className="absolute -z-10 h-full w-full bg-gradient-to-tl from-slate-950/0 via-slate-950 to-slate-950"></div>
        </div>
        <div className="z-20 h-full w-full">
          <div className="flex w-full justify-between px-10">
            <Link
              href="/"
              className="flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image
                src={LogoImage}
                width={40}
                height={40}
                alt="Still River"
                className="inline"
                placeholder="blur"
              />
              <h2 className="ml-4 inline text-2xl font-semibold text-slate-200 transition duration-300 hover:text-indigo-400">
                The Still River
              </h2>
            </Link>
            <FontAwesomeIcon
              icon={faX}
              className="fa-xl pt-3 text-slate-200"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <ul className="mt-10 flex w-full flex-col justify-center">
            {user ? (
              <Link
                href="/api/forum/logout.php"
                className="my-3 ml-8 mr-14 block text-lg font-semibold text-slate-200 transition duration-300 hover:text-indigo-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Image
                  src={`/img/forum/avatars/${user.id}.jpg`}
                  width={40}
                  height={40}
                  alt={user.username}
                  className="inline rounded-full"
                />
                <span className="ml-4"></span>Log Out
              </Link>
            ) : (
              <Link
                href="/api/forum/auth.php"
                className="mx-14 my-3 block text-lg font-semibold text-slate-200 transition duration-300 hover:text-indigo-400"
                onClick={() => setIsOpen(!isOpen)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                Log In
              </Link>
            )}
            {PAGES.map((page) => (
              <li key={page.label} className="m-auto w-full">
                <Link
                  href={page.href}
                  className="mx-14 my-3 block text-lg font-semibold text-slate-200 transition duration-300 hover:text-indigo-400"
                  onClick={() => setIsOpen(!isOpen)}
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

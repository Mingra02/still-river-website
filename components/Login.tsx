"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
  id: number;
}

const Login = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/forum/user.php")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setUser(data);
        }
      });
  }, []);

  return (
    <div className="w-full rounded-xl bg-slate-950/70 px-6 pb-6 pt-3 shadow-lg">
      {user ? (
        <div>
          <h3 className="w-full text-lg font-bold text-slate-200">
            {user.username}
          </h3>
          <div className="mt-4 grid grid-cols-[auto_1fr] gap-4">
            <div className="flex items-center justify-center">
              <Image
                width={80}
                height={80}
                src={`http://www.the-still-river.com/img/forum/avatars/${user.id}.jpg`}
                alt={user.username}
                className="h-20 w-20 rounded-full"
              />
            </div>
            <div>
              <ul className="text-slate-200">
                <Link href="/api/forum/user.php">
                  <li className="text-slate-200 hover:text-indigo-500">
                    My Profile
                  </li>
                </Link>
                <Link href="/api/forum/user.php">
                  <li className="text-slate-200 hover:text-indigo-500">
                    My Posts
                  </li>
                </Link>
                <Link href="/api/forum/user.php">
                  <li className="text-slate-200 hover:text-indigo-500">
                    Edit Account Settings
                  </li>
                </Link>
                <Link href="/api/forum/logout.php">
                  <li className="text-slate-200 hover:text-indigo-500">
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <form action="">
          <h3 className="text-lg font-bold text-slate-200">Login</h3>
          <label htmlFor="" className="mt-4 block text-sm text-slate-400">
            Email
          </label>
          <input
            type="text"
            className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label htmlFor="" className="mt-4 block text-sm text-slate-400">
            Password
          </label>
          <input
            type="password"
            className="w-full items-center justify-center rounded border border-white/10 bg-white/15 p-2 text-slate-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="mb-6 mt-6 flex w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-2 font-semibold text-indigo-100 transition duration-200 hover:bg-indigo-600">
            Log In
          </button>
          <button className="gsi-material-button w-full">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  style={{ display: "block" }}
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">
                Sign in with Google
              </span>
              <span style={{ display: "none" }}>Sign in with Google</span>
            </div>
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;

// components/Navbar.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react"; // Import the Session type from next-auth
import Link from "next/link";
import { ActiveLink } from "./active-link/ActiveLink";

interface NavbarProps {
  session: Session | null; // Define the type of the session prop
}

export default function Navbar1({ session }: NavbarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const navItems = [
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" },
    // { path: "/profile", text: "Profile" },
    // { path: "/admin", text: "Admin" },
    // { path: "/login", text: "Login" },
    // { path: "/logout", text: "Logout" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Basic-Auth
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
            {navItems.map((navItem) => (
              <li
                key={navItem.path}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <ActiveLink
                  key={navItem.path}
                  setIsOpen={setIsOpen}
                  {...navItem}
                />
              </li>
            ))}
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {isAuthenticated && (
                <ActiveLink
                  path={"/profile"}
                  text={"Profile"}
                  setIsOpen={setIsOpen}
                />
              )}
            </li>
            {isAuthenticated && (
              <li className=" self-end block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign Out
                </button>
              </li>
            )}
            {!isAuthenticated && (
              <li className="self-end block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <button onClick={() => signIn()}>Sign In</button>{" "}
                {/* SignIn Button */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

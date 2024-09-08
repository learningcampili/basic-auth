// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react"; // Import the Session type from next-auth
import UserAvatar from "./UserAvatar";

interface NavbarProps {
  session: Session | null; // Define the type of the session prop
}

export default function Navbar({ session }: NavbarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  return (
    <nav>
      <ul className="flex justify-center items-center gap-5">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <button onClick={() => signOut()}>Sign Out</button>{" "}
              {/* SignOut Button */}
            </li>
          </> // only show "Profile" link if authenticated
        )}
        {!isAuthenticated && (
          <li>
            <button onClick={() => signIn()}>Sign In</button>{" "}
            {/* SignIn Button */}
          </li>
        )}
      </ul>
    </nav>
  );
}

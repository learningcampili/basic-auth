"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "./ActiveLink.module.css";

interface Props {
  path: string;
  text: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActiveLink = ({ path, text, setIsOpen }: Props) => {
  const pathName = usePathname();

  return (
    <Link
      onClick={() => setIsOpen(false)}
      className={`${style.link} ${pathName === path && style["active-link"]} `}
      href={path}
    >
      {text}
    </Link>
  );
};

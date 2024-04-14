"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

const Header = ({ session }: { session: Session | null }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setOpen(!isOpen);
  };
  console.log("headerSession", session);
  
  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <header className="w-full p-10 flex justify-between items-center z-50 top-0 fixed right-[0px] bg-black">
      <Link className="z-50 fixed left-[0px]" href="/" onClick={handleMenuClose}>
        <Image src="/sun.jpeg" width={40} height={40} alt="Tailwind CSS" />
      </Link>

      <nav
        className={
          isOpen
            ? "z-40 bg-blue-100 fixed top-0 right-0 bottom-0 left-0 h-screen flex flex-col"
            : "fixed right-[-100%] md:right-4"
        }
      >
        <ul
          className={
            isOpen
              ? "flex h-screen justify-center items-center flex-col gap-6 text-xl"
              : "block md:flex md:gap-8"
          }
        >
          {session ? (
            <>
              <li>
                <Image
                  src={session.user?.image ?? ""}
                  alt={session.user?.name ?? ""}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600"
                >
                  ログアウト
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <button className="rounded-lg bg-blue-500 px-4 py-[7px] text-white hover:bg-gray-600">
                  ログイン
                </button>
              </Link>
            </li>
          )}
          <li>
            <Link onClick={handleMenuClose} href="/recruit">
              Recruit
            </Link>
          </li>
        </ul>
      </nav>
      <button className="z-50 space-y-2 md:hidden fixed right-0" onClick={handleMenuOpen}>
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen ? "block opacity-0 duration-300" : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
        <span
          className={
            isOpen
              ? "block w-8 h-0.5 bg-gray-600 -rotate-45 duration-300"
              : "block w-8 h-0.5 bg-gray-600 duration-300"
          }
        />
      </button>
    </header>
  );
}


export default Header;

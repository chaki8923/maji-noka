"use client";

import Image from "next/image";
import Link from "next/link";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Header = () => {
const { data: session }: any = useSession();

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="mr-40">
        <Link href="/" className="text-black">
          Maji-Noka
        </Link>
      </div>
      <ul className="flex items-center space-x-4">
        {session ? (
          <>
            <li className="item-center text-gray-900">
              ようこそ、{session.user.name}さん
            </li>
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
      </ul>
    </header>
  );
};

export default Header;
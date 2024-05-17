import * as React from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";
import { Navbar } from "flowbite-react";
import Image from "next/legacy/image";



function ResponsiveAppBar() {
  const { data: session }: any = useSession();
  const router = useRouter();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image src="/rogo_cut.jpg" alt="画像" className='' width={140} height={60}/>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={router.pathname === '/'}>
          HOME
        </Navbar.Link>
        <Navbar.Link href="/login" active={router.pathname === '/login'}>
          ログイン
        </Navbar.Link>
        <Navbar.Link href="/signup" active={router.pathname === '/login'}>
          会員登録
        </Navbar.Link>
        <Navbar.Link href="/cart" active={router.pathname === '/cart'}>カート</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default ResponsiveAppBar;

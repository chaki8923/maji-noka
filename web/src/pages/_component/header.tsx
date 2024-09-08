import * as React from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { Navbar } from "flowbite-react";
import Image from "next/legacy/image";
import { useShoppingCart } from 'use-shopping-cart'
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from 'react-icons'



function ResponsiveAppBar() {
  const { data: session }: any = useSession();
  const { cartCount } = useShoppingCart();
  const router = useRouter();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <Image src="/rogo_cut.jpg" alt="画像" className='' width={140} height={60} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={router.pathname === '/'}>
          HOME
        </Navbar.Link>
        <Navbar.Link className='cart-icon' href="/cart" active={router.pathname === '/cart'}>
        <IconContext.Provider value={{ size: '24px' }}>
          <FaShoppingCart />
          {cartCount! > 0 && (
          <span className="w-5 h-5 text-gray-100 bg-red-500 rounded-full">
            {cartCount}
          </span>
          )}
        </IconContext.Provider>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default ResponsiveAppBar;

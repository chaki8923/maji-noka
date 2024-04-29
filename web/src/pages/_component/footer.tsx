
'use client';
import { Footer } from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="田中本気農家™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="/policy">Privacy Policy</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterComponent;
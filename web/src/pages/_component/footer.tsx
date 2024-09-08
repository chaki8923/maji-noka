
'use client';
import styles from './index.module.scss';
import { Footer } from "flowbite-react";
import { FaSquareXTwitter } from "react-icons/fa6";

const FooterComponent = () => {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="田中本気農家™" year={2024} />
      <Footer.LinkGroup className={styles.footerWrapper}>
        <Footer.Link href="https://twitter.com/noka_tmn" target="_blank"><FaSquareXTwitter className="x-icon"/></Footer.Link>
        <Footer.Link href="/rule">特定商取引法／返品について</Footer.Link>
        <Footer.Link href="/policy">プライバシーポリシー</Footer.Link>
        <Footer.Link href="/contact">お問い合わせ</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterComponent;
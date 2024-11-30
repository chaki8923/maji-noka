import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import Header from "./_component/header";
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import "../../styles/globals.css"
import './item/styles.css';
import './policy/styles.css';
import './_component/styles.css';
import FooterComponent from "./_component/footer";
import { CartProvider } from 'use-shopping-cart'
import Head from "next/head";


function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>田中本気農家 | 商品一覧</title>
        <meta name="description" content="埼玉県熊谷市の農家。本気で育てた激アツな食材をお届け！" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://web.maji-noka.com" />
        <meta property="og:image" content="https://maji-image-pro.s3.ap-northeast-1.amazonaws.com/common/gekiatsu.jpg" />
        <meta property="og:title" content="田中本気農家" />
      </Head>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        shouldPersist={true}
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
        currency="JPY"
        successUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/success`}
        cancelUrl={`${process.env.NEXT_PUBLIC_BASE_URL}`}
      >
        <Header />
        <div className="min-h-[640px]">
          <Component {...pageProps} />
        </div>
        <FooterComponent />
      </CartProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp);


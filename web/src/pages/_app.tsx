import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import Header from "./_component/header";
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import "../../styles/globals.css"
import './item/styles.css';
import './_component/styles.css';
import FooterComponent from "./_component/footer";
import { CartProvider } from 'use-shopping-cart'


function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {

  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="min-h-[640px]">
        <CartProvider
          mode="payment"
          cartMode="client-only"
          shouldPersist={true}
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          currency="JPY"
          successUrl="http://localhost:3000/success"
          cancelUrl="http://localhost:3000"
        >
          <Component {...pageProps} />
        </CartProvider>
      </div>
      <FooterComponent />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp);


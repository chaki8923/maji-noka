import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import Header from "./_component/header";
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import "../../styles/globals.css"
import './item/styles.css';
import './_component/styles.css';
import FooterComponent from "./_component/footer";


function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <Header/>
      <div className="min-h-[640px]">
        <Component {...pageProps} />
      </div>
      <FooterComponent />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp);


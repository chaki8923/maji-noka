import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import Header from "./_component/header";
import Sidebar from "./_component/sideBar";
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import "../../styles/globals.css"
import './item/styles.css';


function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <div className="flex">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp);


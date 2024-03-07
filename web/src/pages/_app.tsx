import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import "../../styles/globals.css"
import Link from "next/link";
function MyApp({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Link href={`/`} className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
        ホームへ
      </Link>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp);


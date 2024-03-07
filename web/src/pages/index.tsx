
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { NextPage } from "next";


export default function IndexPage() {
  const router = useRouter();
  const { session, status }: any = useSession();
  switch (status) {
    case "loading":
      return (<div>loading…</div>);
    case "unauthenticated":
      router.push("/login");
      break;
    case "authenticated":
      return (<div>ログイン成功</div>);
  }

  return null;
}



import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Items from "./item/index";


export default function IndexPage() {
  const router = useRouter();
  const { session, status }: any = useSession();
  console.log("session", session);
  
  switch (status) {
    case "loading":
      return (<div>loading…</div>);
    case "unauthenticated":
      router.push("/login");
      break;
    case "authenticated":
      return (
        <>
        <Items />
        </>
      );
  }

  return null;
}


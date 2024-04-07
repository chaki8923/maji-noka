
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Items from "./item/index";
import Slider from "./_component/slider";
import Loading from "./_component/loading";


export default function IndexPage() {
  const router = useRouter();
  const { data: session, status }: any = useSession();
  console.log("session", session);
  
  switch (status) {
    case "loading":
      return (<Loading />);
    case "unauthenticated":
      router.push("/login");
      break;
    case "authenticated":
      return (
        <>
        <Slider />
        <Items />
        </>
      );
  }

  return null;
}



import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Items from "./item/index";
import Slider from "./_component/slider";
import Loading from "./_component/loading";

export default function IndexPage() {
  const { data: session, status }: any = useSession();
  
  switch (status) {
    case "loading":
      return (<Loading />);
    case "unauthenticated":
      return (
        <>
        <Slider />
        <Items />
        </>
      );
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



import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Items from "./item/index";
import { Spinner } from "flowbite-react";


export default function IndexPage() {
  const router = useRouter();
  const { session, status }: any = useSession();
  
  switch (status) {
    case "loading":
      return (<div> <Spinner color="info" aria-label="Info spinner example" /></div>);
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


import { Button } from "@material-tailwind/react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react";
import Items from "../item/index"



const Login: NextPage = () => {
  const { session, status }: any = useSession();
 ここから
  if(status){
    return (
      <>
      <Items />
      </>
    )
  }
  return (
    <>
      <input
        type="email"
        name="email"
        id="email"
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <input
        type="passward"
        name="passward"
        id="passward"
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button onClick={() => signIn("google", {collbackUrl: "/"})}>Googleでログイン</button>
    </>
  );
};

export default Login;

import { motion } from 'framer-motion'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Items from "./item/index";
import Slider from "./_component/slider";
import Loading from "./_component/loading";

export default function IndexPage() {
  const { data: _, status }: any = useSession();

  switch (status) {
    case "loading":
      return (<Loading />);
    case "unauthenticated":
      return (
        <motion.div
          initial={{ opacity: 0 }} // 初期状態
          animate={{ opacity: 1 }} // マウント時
          exit={{ opacity: 0 }}    // アンマウント時
          transition={{ duration: 1.3 }} //遅延実行
        >
          <Slider />
          <Items />
        </motion.div>
      );
    case "authenticated":
      return (
        <motion.div
          initial={{ opacity: 0 }} // 初期状態
          animate={{ opacity: 1 }} // マウント時
          exit={{ opacity: 0 }}    // アンマウント時
          transition={{ duration: 1.3 }} //遅延実行
        >
          <Slider />
          <Items />
        </motion.div>
      );
  }

  return null;
}


import { router } from "../../trpc"; // tRPCのルーターとプロシージャヘルパーをインポート
import { itemRouter } from "./item";


export const appRouter = router({
    output: itemRouter,
  });
  
// export type definition of API
export type AppRouter = typeof appRouter;
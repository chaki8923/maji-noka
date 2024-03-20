import { procedure, router } from '../trpc';
import {itemRouter} from './item'
import {userRouter} from './user'
import {categoryRouter} from './category'

export const appRouter = router({
  item: itemRouter,
  category: categoryRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;


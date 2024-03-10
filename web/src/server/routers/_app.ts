import { procedure, router } from '../trpc';
import {helloRouter} from './hello'
import {itemRouter} from './item'
import {userRouter} from './user'

export const appRouter = router({
  item: itemRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;


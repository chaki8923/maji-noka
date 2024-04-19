import { procedure, router } from '../trpc';
import {itemRouter} from './item'
import {userRouter} from './user'
import {categoryRouter} from './category'
import {purchaseRouter} from './purchase'
import {sliderRouter} from './slider'

export const appRouter = router({
  item: itemRouter,
  category: categoryRouter,
  user: userRouter,
  slider: sliderRouter,
  purchase: purchaseRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;


import { z } from 'zod';
import { procedure, router } from '../trpc';
import {helloRouter} from './hello'
import {itemRouter} from './item'

export const appRouter = router({
  hello: helloRouter,
  item: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;


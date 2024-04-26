import { z } from "zod";


// 更新用
export const updateInput = z.object({
  id: z.number(),
  inventory: z.number()
});
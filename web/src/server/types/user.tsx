import { z } from "zod";

// 新規作成用
export const createInput = z.object({
  email: z
    .string()
    .min(6, "email must be at least 6 letter")
    .max(50, "email must be 50 letters or less"),
});
// 新規作成用
export const updateInput = z.object({
  id: z.string(),
  customerId: z.string(),

});

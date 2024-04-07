import { z } from "zod";

// 新規作成用
export const createInput = z.object({
  email: z
    .string()
    .min(6, "email must be at least 6 letter")
    .max(50, "email must be 50 letters or less"),
});

export const updateInput = z.object({
  id: z.string(),
  customerId: z.string(),

});
export const updateAddressInput = z.object({
  id: z.string(), // idをstring、null、またはundefinedに設定
  state: z.string().nullable().optional(), // stateをstring、null、またはundefinedに設定
  city: z.string().nullable().optional(), // cityをstring、null、またはundefinedに設定
  postal_code: z.string().nullable().optional(), // postal_codeをstring、null、またはundefinedに設定
  line1: z.string().nullable().optional(), // line1をstring、null、またはundefinedに設定
  line2: z.string().nullable().optional(), // line2をstring、null、またはundefinedに設定
  country: z.string().nullable().optional(), // countryをstring、null、またはundefinedに設定
});
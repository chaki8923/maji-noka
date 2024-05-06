import { z } from "zod";
import { createInput, updateInput, updateAddressInput } from "../types/user";
import { procedure, router } from "../trpc";
import prisma from '../../../lib/prismadb'

// 新しいPrismaClientインスタンスを作成します。
// const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const userRouter = router({

  // 特定のIDのTODOを取得するクエリです。
  getUserById: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたemailのuserをデータベースから取得します。
      const user = await prisma.user.findUnique({
        where: { id: input.id },
      });

      // user
      if (!user) {
        throw new Error("User not found");
      }
      // 取得したuserを返します。
      return user;
    }),
  getUserByEmail: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたemailのuserをデータベースから取得します。
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      // user
      if (!user) {
        throw new Error("User not found");
      }
      // 取得したuserを返します。
      return user;
    }),
  updateUser: procedure.input(updateInput).mutation(async ({ input }) => {
    const { id, customerId } = input;
    const user = await prisma.user.update({
      where: { id },
      data: { customerId },
    });
    // user
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),
  updateUserAddress: procedure.input(updateAddressInput).mutation(async ({ input }) => {
    const { id, city, country, state, postal_code, line1, line2 } = input;
    const user = await prisma.user.update({
      where: { id },
      data: { city, country, state, postal_code, line1, line2 },
    });
    // user
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }),

});
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createInput } from "../types/user";
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
});
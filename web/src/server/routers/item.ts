import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { procedure, router } from "../trpc";

// 新しいPrismaClientインスタンスを作成します。
const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const itemRouter = router({
  
  // 全てのTODOを取得するクエリです。
  getItems: procedure.query(async () => {
    // 全てのTODOをデータベースから取得します。
    const items = await prisma.items.findMany();
    
    // 取得したTODOを返します。
    return items;
  }),
  
  // 特定のIDのTODOを取得するクエリです。
  getItemById: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたIDのTODOをデータベースから取得します。
      const item = await prisma.items.findUnique({
        where: { id: input.id },
      });
      
      // TODOが見つからない場合、エラーをスローします。
      if (!item) {
        throw new Error("Todo not found");
      }
      
      // 取得したTODOを返します。
      return item;
    }),
});
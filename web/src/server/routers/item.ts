import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import prisma from '../../../lib/prismadb'
import { procedure, router } from "../trpc";

// 新しいPrismaClientインスタンスを作成します。
// const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const itemRouter = router({
  
  // 全てのitemを取得するクエリです。
  getItems: procedure.query(async () => {
    // 全てのitemをデータベースから取得します。
    const items = await prisma.items.findMany();
    
    // 取得したitemを返します。
    return items;
  }),
  
  // 特定のIDのitemを取得するクエリです。
  getItemById: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたIDのitemをデータベースから取得します。
      const item = await prisma.items.findUnique({
        where: { id: input.id },
        include: { category: { select: { name: true } } }
      });
      
      // itemが見つからない場合、エラーをスローします。
      if (!item) {
        throw new Error("item not found");
      }
      
      // 取得したitemを返します。
      return item;
    }),
  // 特定のIDのitemを取得するクエリです。
  getItemByKeyword: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        keyword: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたIDのitemをデータベースから取得します。
      const items = await prisma.items.findMany({
        where: { 
          name: {
            contains:  input.keyword 
          }
        },
      });
      
      // itemが見つからない場合、エラーをスローします。
      if (!items) {
        throw new Error("item not found");
      }
      
      // 取得したitemを返します。
      return items;
    }),
});
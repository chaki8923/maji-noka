import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import prisma from '../../../lib/prismadb'
import { procedure, router } from "../trpc";

// 新しいPrismaClientインスタンスを作成します。
// const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const categoryRouter = router({
  
  // 全てのitemを取得するクエリです。
  getCategories: procedure.query(async () => {
    // 全てのitemをデータベースから取得します。
    const categories = await prisma.category.findMany();
    
    // 取得したitemを返します。
    return categories;
  }),
  
  
});
import { z } from "zod";
import prisma from "../../../lib/prismadb";
import { procedure, router } from "../trpc";


// 新しいrouterを作成します。
export const purchaseRouter = router({
  getItems: procedure.query(async () => {
    const purchase = await prisma.purchase.findMany();

    return purchase;
  }),

  // 特定のIDのitemを取得するクエリです。
  getPurchaseByUserId: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        customerId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // 指定されたIDのitemをデータベースから取得します。
      const purchase = await prisma.purchase.findMany({
        where: { customerId: input.customerId },
        include: {
          item: {
            include: {
             
            },
          },
        },
      });

      // itemが見つからない場合、エラーをスローします。
      if (!purchase) {
        throw new Error("purchase not found");
      }

      return purchase;
    }),
    deletePurchase: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await prisma.purchase.delete({
        where: { id: input.id },
      });
    }),
});

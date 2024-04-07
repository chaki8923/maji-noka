import { z } from "zod";
import prisma from "../../../lib/prismadb";
import { procedure, router } from "../trpc";
import { updateInput } from "../types/items";
import { CartItem } from "@/src/types";

// Date型
function instanceToPlain(instance: any): any {
  const plainObject: any = {};
  // インスタンスのプロパティを列挙して、プレーンなJavaScriptオブジェクトにコピーする
  for (const key in instance) {
    if (instance.hasOwnProperty(key)) {
      plainObject[key] = instance[key];
    }
  }
  return plainObject;
}

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
      }),
    )
    .query(async ({ input }) => {
      // 指定されたIDのitemをデータベースから取得します。
      const item = await prisma.items.findUnique({
        where: { id: input.id },
        include: { category: { select: { name: true } } },
      });

      // itemが見つからない場合、エラーをスローします。
      if (!item) {
        throw new Error("item not found");
      }
 

      // 取得したitemをCartItemに変換して返します。
      const cartItem: CartItem = {
        ...item,
        categoryName: item.category?.name ?? "Unknown",
        quantity: 0, // ここで適切な数量を設定してください
      };
      // 取得したitemを返します。
      return instanceToPlain(cartItem);
    }),
  // 特定のIDのitemを取得するクエリです。
  getItemByKeyword: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        keyword: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      // 指定されたIDのitemをデータベースから取得します。
      const items = await prisma.items.findMany({
        where: {
          name: {
            contains: input.keyword,
          },
        },
      });

      // itemが見つからない場合、エラーをスローします。
      if (!items) {
        throw new Error("item not found");
      }

      // 取得したitemを返します。
      return items;
    }),

  updateItem: procedure.input(updateInput).mutation(async ({ input }) => {
    const { id, inventory } = input;
    const item = await prisma.items.update({
      where: { id },
      data: { inventory },
    });
    return item;
  }),
});

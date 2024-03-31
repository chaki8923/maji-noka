import { z } from "zod";
import prisma from "../../../lib/prismadb";
import { procedure, router } from "../trpc";

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
export const sliderRouter = router({
  
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
      const slider = await prisma.sliders.findUnique({
        where: { id: 1 },
      });

      // itemが見つからない場合、エラーをスローします。
      if (!slider) {
        throw new Error("item not found");
      }

      return instanceToPlain(slider)
    }),
});

import { z } from "zod"; // zodライブラリからzをインポート
import { procedure, router } from "../../trpc"; // tRPCのルーターとプロシージャヘルパーをインポート

// APIのルートを定義
export const itemRouter = router({
  // 'hello'という名前のルートを定義
  getItem: procedure
    // 入力となるオブジェクトの型をzodで定義
    .input(
      z.object({
        name: z.string(), // 'text'という名前のプロパティが文字列であることを定義
      })
    )
    // 入力データを元に返却するデータを定義
    .query((opts) => {
      return {
        output: `hello ${opts.input.name}`, // 入力の'name'プロパティを使って挨拶文を作成
      };
    }),
});
import { initTRPC } from '@trpc/server';  // tRPCサーバーの初期化関数をインポート
const t = initTRPC.create();  // tRPCを初期化してインスタンスを作成。ここでは変数名としてtを使用。
export const router = t.router;  // tオブジェクトからルーターを取得しエクスポート
export const procedure = t.procedure;  // tオブジェクトからプロシージャヘルパーを取得しエクスポート
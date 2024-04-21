import { z } from "zod";
import { createInput, updateInput, updateAddressInput } from "../types/user";
import { procedure, router } from "../trpc";
import prisma from '../../../lib/prismadb'

// 新しいPrismaClientインスタンスを作成します。
// const prisma = new PrismaClient();

// 新しいrouterを作成します。
export const customerRouter = router({

  // 特定のIDのTODOを取得するクエリです。
  getCustomerById: procedure
    .input(
      // 入力スキーマを指定します。IDは数値である必要があります。
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      // 指定されたemailのuserをデータベースから取得します。
      const customer = await prisma.customer.findUnique({
        where: { id: input.id },
      });

      // customer
      if (!customer) {
        throw new Error("customer not found");
      }
      // 取得したcustomerを返します。
      return customer;
    }),
  updateCustomer: procedure.input(updateInput).mutation(async ({ input }) => {
    const { id, customerId } = input;
    const customer = await prisma.customer.update({
      where: { id },
      data: { customerId },
    });
    // customer
    if (!customer) {
      throw new Error("customer not found");
    }
    return customer;
  }),

});
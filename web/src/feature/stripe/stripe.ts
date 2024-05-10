import { Customer } from "@/src/types";
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
});


export const createCustomerId = async ({ items}: { items: any  }) => {
  try {
    console.log("createCustomerIdの中", items);
    // customerを作成する
    const customer = await stripe.customers.create({
      // name: userName,
      // email: userEmail,
      // custmerの言語を日本語に設定します
      preferred_locales: ["ja"],
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          productId: item.id,
          title: item.name,
          quantity: item.quantity
        })))
      },
    });

    return customer.id;
  } catch (error) {
    throw error;
  }
};

export const getShippingByCustomerID = async ({
  customerId,
}: {
  customerId: string;
}) => {
  try {
    const res = await stripe.customers.retrieve(customerId);
    // 顧客が削除されている場合は、customer.shippingが取得できないのでエラーにする
    if (res.deleted) {
      throw new Error("顧客が削除されています");
    }
    const customer = res as Stripe.Customer;
    
    return customer.shipping;
  } catch (error) {
    throw error;
  }
};

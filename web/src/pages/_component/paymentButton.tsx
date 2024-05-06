import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc';
import { Button } from 'flowbite-react';
import AlertToast from "./alertToast";
import { useSession } from "next-auth/react";
import { createCustomerId } from "../../feature/stripe/stripe";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { useShoppingCart } from 'use-shopping-cart'

type PaymentProps = {
  item: {
    id: number,
    inventory: number,
    name: string,
    price: number,
    description: string,
    category_id: number,
    image_count: number,
    maji_flag: boolean,
    postage: number | null,
  },
  quantity: number
};

const Checkout: React.FC<PaymentProps> = ({ item, quantity }) => {
  const { cartDetails, cartCount } = useShoppingCart();
  const router = useRouter();
  const prevInventory = item ? item.inventory : 0;
  const items = Object.values(cartDetails ?? {}).map((entry) => entry);

  console.log("items!!!", items);
  console.log("cartCount!!!", cartCount);
  // 在庫 - 注文数
  const inventory = prevInventory - quantity
  //stripe checkout
  const startCheckout = async (productId: number, itemName: string) => {
    try {
      const customerId = await createCustomerId({ productId, inventory, itemName });
      let checkoutAry
      if(cartCount! > 0){
       
        checkoutAry = items.map((item) => ({
          productId: item.id,
          title: item.name,
          price: item.price,
          quantity: item.quantity,
          customerId
        }));
      }else{
        checkoutAry = {
          productId,
          title: item.name,
          price: item.price,
          quantity: quantity,
          customerId: customerId
        }
      }
      console.log("wei!!!", checkoutAry);
      const response = await fetch(
        `http://localhost:3000/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutAry),
        }
      );
      const responseData = await response.json();
      if (responseData && responseData.checkout_url) {
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        // if (customerId) {
        //   await updateUserMutation.mutateAsync({ id: session.user.id, customerId: customerId });
        // }
        router.push(responseData.checkout_url);
      } else if (inventory > 0) {
        return (
          <AlertToast />
        )
      } else {
        alert("エラーが発生しました")
      }

    } catch (err) {
      console.error("Error in 決済！:", err);
      alert(err)
    }
  };

  return (
    <div className="mt-2">
      <Button color="blue" onClick={() => startCheckout(item.id, item.name)} className="xl:w-[180px] w-full">
        購入する　<RiMoneyCnyCircleLine />
      </Button>
    </div>
  )
}

export default Checkout;
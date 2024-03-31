import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc';
import { Button } from 'flowbite-react';
import AlertToast from "./alertToast";

type PaymentProps = {
  item: {
    id: number,
    inventory: number | null,
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
  const router = useRouter();
  // createTodoエンドポイントに対するmutationを生成
  const updateTodoMutation = trpc.item.updateItem.useMutation();
  const id = item.id
  // 在庫 - 注文数
  const inventory = item.inventory! - quantity
  //stripe checkout
  const startCheckout = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            title: item.name,
            price: item.price,
            quantity: quantity
          }),
        }
      );

      const responseData = await response.json();
      if (responseData && responseData.checkout_url) {
        console.log("session_id", responseData.session_id);
        
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        //チェックアウト後のURL遷移先
        await updateTodoMutation.mutateAsync({ id, inventory });
        router.push(responseData.checkout_url);
      } else if(inventory > 0) {
        return (
          <AlertToast />
          )
      }else{
        alert("エラーが発生しました")
      }
    } catch (err) {
      console.error("Error in 決済！:", err);
    }
  };

  return (
    <div className="mt-2">
      <Button color="blue" onClick={() => startCheckout(item.id)}>
        購入する
      </Button>
    </div>
  )
}

export default Checkout
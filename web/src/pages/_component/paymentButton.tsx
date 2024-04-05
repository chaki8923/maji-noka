import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc';
import { Button } from 'flowbite-react';
import AlertToast from "./alertToast";
import { useSession } from "next-auth/react";
import { createCustomerId } from "../../feature/stripe/stripe";


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
    deleted_at: string | null
  },
  quantity: number
};

const Checkout: React.FC<PaymentProps> = ({ item, quantity }) => {
  const router = useRouter();
  // createTodoエンドポイントに対するmutationを生成
  const updateItemMutation = trpc.item.updateItem.useMutation();
  const updateUserMutation = trpc.user.updateUser.useMutation();
  const { data: session, status }: any = useSession();

  
  // ここでユーザ情報取得してcutomerIdをチェックアウトに渡し
  const {data: userData} = trpc.user.getUserById.useQuery({id: session.user.id})
  console.log("userData", userData);
  
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
            quantity: quantity,
            customerId: userData!.customerId
          }),
        }
      );
        

      const responseData = await response.json();
      if (responseData && responseData.checkout_url) {        
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        const customer = await createCustomerId({ user: session.user });
        console.log("customer", customer);
        if (customer){
          await updateItemMutation.mutateAsync({ id, inventory });
          await updateUserMutation.mutateAsync({ id: session.user.id, customerId: customer!.id });
        }
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
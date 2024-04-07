import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc';
import { Button } from 'flowbite-react';
import AlertToast from "./alertToast";
import { useSession } from "next-auth/react";
import { createCustomerId, getShippingByCustomerID } from "../../feature/stripe/stripe";


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
  const updateItemMutation = trpc.item.updateItem.useMutation();
  const updateUserMutation = trpc.user.updateUser.useMutation();
  const updateUserAddressMutation = trpc.user.updateUserAddress.useMutation();
  const { data: session, status }: any = useSession();

  const id = item.id
  // 在庫 - 注文数
  const inventory = item.inventory! - quantity
  //stripe checkout
  const startCheckout = async (productId: number) => {    
    try {
      const customerId = await createCustomerId({ user: session.user });
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
            customerId: customerId
          }),
        }
      );
        

      const responseData = await response.json();
      console.log("responseData.session_id", responseData.session_id);
      console.log("responseData.checkout_url", responseData.checkout_url);
      if (responseData && responseData.checkout_url) {        
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        
        if (customerId){
          await updateItemMutation.mutateAsync({ id, inventory });
          await updateUserMutation.mutateAsync({ id: session.user.id, customerId: customerId });
          const shipping = await getShippingByCustomerID({
            customerId: customerId,
          });
          console.log("shipping", shipping);
          if(shipping){
            await updateUserAddressMutation.mutateAsync({
              id: session.user.id, 
              city: shipping.address?.city,
              country: shipping.address?.country,
              postal_code: shipping.address?.postal_code,
              state: shipping.address?.state,
              line1: shipping.address?.line1,
              line2: shipping.address?.line2,
            })
          }
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
  console.log("購入前確認",session);
  
  if(!session){
    return <div>...</div>
  }
  return (
    <div className="mt-2">
      <Button color="blue" onClick={() => startCheckout(item.id)}>
        購入する
      </Button>
    </div>
  )
}

export default Checkout
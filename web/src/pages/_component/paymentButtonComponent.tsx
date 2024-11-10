import { useRouter } from "next/router";
import { Button } from 'flowbite-react';
import { createCustomerId } from "../../feature/stripe/stripe";
import { CartEntry } from "use-shopping-cart/core";
type PaymentProps = {
  items: CartEntry,
  quantity: number
};

const Checkout: React.FC<PaymentProps> = ({ items, quantity }) => {
  const router = useRouter();
  
  //stripe checkout
  const startCheckout = async (productId: string) => {
    try {
      const customerId = await createCustomerId({ items: [items] });
      let checkoutAry
        checkoutAry = [{
          productId,
          title: items!.name,
          price: items!.price,
          postage: items!.postage,
          quantity: quantity,
          description: items.description,
          customerId: customerId,
          images: items.image_path01
        }]
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({checkoutAry}),
        }
      );
      const responseData = await response.json();
      if (responseData && responseData.checkout_url) {
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        router.push(responseData.checkout_url);
      
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
      <Button  onClick={() => startCheckout(items!.id)} className="xl:w-[180px] w-full rounded-none bg-black text-white payment-button">
        購入する
      </Button>
    </div>
  )
}

export default Checkout;
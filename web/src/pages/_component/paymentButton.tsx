import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from "next/router";
import { trpc } from '../../utils/trpc';
interface PaymentProps {
  itemId: number; // stringからnumberに変更
}


const Checkout: React.FC<PaymentProps> = ({ itemId })  => {
  
  const router = useRouter();

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
            title: "お米だよ",
            price: 1200,
            userId: 1,
          }),
        }
      );

      const responseData = await response.json();
      if (responseData && responseData.checkout_url) {
        sessionStorage.setItem("stripeSessionId", responseData.session_id);
        //チェックアウト後のURL遷移先
        router.push(responseData.checkout_url);
      } else {
        console.error("エラーresponse data:", responseData);
      }
    } catch (err) {
      console.error("Error in 決済！:", err);
    }
  };

  return (
    <div>
      <button onClick={() => startCheckout(1)}  color="primary">
        購入する
      </button>
    </div>
  )
}

export default Checkout
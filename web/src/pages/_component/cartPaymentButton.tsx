import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { createCustomerId } from "../../feature/stripe/stripe";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { useShoppingCart } from 'use-shopping-cart'
import { getImageUrl } from '../../hooks/awsImageoperations';
import { CartEntry } from "use-shopping-cart/core";
type PaymentProps = {
  item: CartEntry,
  quantity: number
};

const Checkout: React.FC<Partial<PaymentProps>> = () => {
  const { cartDetails, cartCount } = useShoppingCart();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();
  const items: any = Object.values(cartDetails ?? {}).map((entry) => entry);

  useEffect(() => {
    if (items) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(items.map(async (item: any) => {
          return await getImageUrl(
            'maji-image',
            `item/${item.id}/item_image_0_${item.id}`,
            3600
          );
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, [items.data]);


  console.log("items!!!", items);
  console.log("cartDetails!!!", cartDetails);

  //stripe checkout
  const startCheckout = async () => {
    try {
        const customerId = await createCustomerId({ items });
        let checkoutAry
      
        checkoutAry = items.map((item: any, index: number) => ({
          productId: item.id,
          title: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description,
          images: imageUrls[index],
          customerId
        }));
      const response = await fetch(
        `http://localhost:3000/api/checkout`,
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
      <Button color="blue" onClick={() => startCheckout()} className="w-full rounded-none p-6 total-buy">
        まとめて購入　<RiMoneyCnyCircleLine />
      </Button>
    </div>
  )
}

export default Checkout;
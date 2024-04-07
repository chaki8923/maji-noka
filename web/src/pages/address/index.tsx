import { createCustomerId, getShippingByCustomerID } from "../../feature/stripe/stripe";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
export default function Address() {
  const { data: session, status }: any = useSession();
  const [shipping, setShipping] = useState<any>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = await createCustomerId({ user: session.user });
        console.log("customerId", customerId);
        const fetchedShipping = await getShippingByCustomerID({
          customerId: customerId,
        });
        console.log("fetchedShipping", fetchedShipping);
        
        setShipping(fetchedShipping); // shippingの値を更新
      } catch (error) {
        // エラーの処理
      }
    };

    fetchData();
  }, []); 

  if (shipping === null || shipping.address === undefined) {
    return <div>address === null</div>;
  }

  return (
    <main className="max-w-screen-md mx-auto">
      <p>{shipping.address.country}</p>
      <p>{shipping.address.postal_code}</p>
      <p>{shipping.address.state}</p>
      <p>{shipping.address.line1}</p>
      <p>{shipping.address.line2}</p>
    </main>
  );
}
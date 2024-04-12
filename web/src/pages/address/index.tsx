import { getShippingByCustomerID } from "../../feature/stripe/stripe";
import { useSession } from "next-auth/react";
import { trpc } from '../../utils/trpc';
import { useState, useEffect } from 'react';
import Loading from "../_component/loading";
export default function Address() {
  const { data: session, status }: any = useSession();
  const [shipping, setShipping] = useState<any>(null);

  const { data: userData } = trpc.user.getUserById.useQuery({ id: session?.user?.id });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userData) return; // userDataがまだ読み込まれていない場合は処理を終了する
        console.log("session:address", session);
        const fetchedShipping = await getShippingByCustomerID({
          customerId: userData.customerId!,
        });
        console.log("fetchedShipping", fetchedShipping);
        setShipping(fetchedShipping); // shippingの値を更新
      } catch (error) {
        // エラーハンドリング
      }
    };

    fetchData();
  }, [session, userData]); // sessionとuserDataが変更されたときに再実行する

  
  if (shipping === null || shipping.address === undefined) {
    return <Loading />
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
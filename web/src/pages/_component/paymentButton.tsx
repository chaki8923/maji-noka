import { useRouter } from "next/router";
export const Payment = () => {
  const { push } = useRouter();
  return (
    <>
      <div>
        <button
          className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white border-blue-700 mx-1"
          onClick={async () => {
            const response = await fetch("/api/checkout", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customer_id: " 1",// ここに顧客IDを値に設定しましょう
                price_id: "1", // ここに商品IDを値に設定しましょう
              }),
            }).then((data) => data.json());
            push(response.checkout_url);
          }}
        >
          商品購入ボタン
        </button>
      </div>
    </>
  );
};
export default Payment;
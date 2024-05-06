import { useCart } from "../../hooks/useCart";
import { Button, Card, Select } from 'flowbite-react';
import type { NextPage } from 'next';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getImageUrl } from '../../hooks/awsImageOperations';
import Payment from "../_component/paymentButton";
import { useRouter } from 'next/router';
import { TbArrowBackUp } from "react-icons/tb";
import Image from "next/legacy/image";
import { useShoppingCart } from 'use-shopping-cart'

function Cart() {
  const router = useRouter();
  const { cart, removeCart } = useCart();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [quantities, setQuantities] = useState(cart.map(item => item.quantity));
  const { cartDetails, redirectToCheckout, cartCount, removeItem } = useShoppingCart();
  const items = Object.values(cartDetails ?? {}).map((entry) => entry);

  useEffect(() => {
    if (items) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(items.map(async (item) => {
          return await getImageUrl('maji-image', `item/${item.id}/item_image_0_${item.id}`, 3600);
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, []);

  const handleChange = (index: number, selectedQuantity: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = selectedQuantity;
      return newQuantities;
    });
  };

  const deleteQuantities = (index: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities.splice(index, 1);
      return newQuantities;
    });
  }

  const handleBack = () => {
    router.back();
  };

  if (items.length === 0) {
    return (
      <div className="flex justify-center self-center">
        <div className="mt-[260px]">
          <div>何もカートに入ってまへん。</div>
          <Button color="blue" onClick={() => handleBack()} className="w-[180px] mt-2">
            <TbArrowBackUp />戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-4 p-8 flex-wrap sm:justify-normal justify-center'>
      {items.map((item, index) => (
        <Card key={item.id} className='w-80'>
          <p className='flex justify-between items-end text-gray-800'>
            {item.name}
          </p>
          <p className='font-bold text-xl text-gray-800'>¥{item.price}</p>
          <p className='relative h-52'>
            {imageUrls[index] && (
              <Image src={imageUrls[index]} alt="" className='' layout="fill" />
            )}
          </p>
          <Select id="countries" required value={quantities[index]} onChange={(e) => handleChange(index, parseInt(e.target.value))}>
            {Array.from({ length: 10 }, (_, i) => i).map((number) => (
              <option key={number}>{number + 1}</option>
            ))}
          </Select>
          <div className="xl:px-9 px-0">

            <Button color="failure" onClick={() => removeItem(item.id)}>削除</Button>
          </div>
        </Card>
      ))}
      <Button
        color="blue"
        disabled={cartCount! < 1}
        onClick={async () => {
          try {
            const result = await redirectToCheckout()
            if (result.error) throw new Error(result.error)
          } catch (err: any) {
            window.alert(err.message);
          }
        }}
      >
        注文する
      </Button>
    </div>
  );
};
export default Cart;

import { useCart } from "../../hooks/useCart";
import { Button, Card, Select } from 'flowbite-react';
import type { NextPage } from 'next';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getImageUrl } from '../../pages/awsImageOperations';
import Payment from "../_component/paymentButton";
import { useRouter } from 'next/router';
import { TbArrowBackUp } from "react-icons/tb";

const Cart: NextPage = () => {
  const router = useRouter();
  const { cart, addCart, removeCart } = useCart();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [quantities, setQuantities] = useState(cart.map(item => item.quantity));

  const handleChange = (index: number, selectedQuantity: number) => {
    setQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = selectedQuantity;
      return newQuantities;
    });
  };

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    if (cart.length > 0) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(cart.map(async (item) => {
          return await getImageUrl('maji-image', `item/${item.id}/item_image_0_${item.id}`, 3600);
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, []);

  if (cart.length === 0) {
    return (
      <>
        <div>何もカートに入ってまへん。</div>
        <Button color="blue" onClick={() => handleBack()} className="w-[180px] mt-2">
          <TbArrowBackUp />商品ページに戻る
        </Button>
      </>

    )
  }

  return (
    <>
      <div className='flex gap-4 p-8'>
        {cart.map((item, index) => (
          <Card key={item.id} className='w-80'>
            <p className='flex justify-between items-end'>
              <h4 className="text-gray-800">{item.name}</h4>
            </p>
            <p className='mt-3 font-bold text-xl text-gray-800'>¥{item.price}</p>
            <p className='relative h-52'>
              <img src={imageUrls[index]} alt="" className='' />
            </p>
            <p className='text-sm min-h-[60px]'>{item.description}</p>

            <Select id="countries" required value={quantities[index]} onChange={(e) => handleChange(index, parseInt(e.target.value))}>
              {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                <option key={number}>{number + 1}</option>
              ))}
            </Select>
            <Payment item={item} quantity={quantities[index]} />
            <Button color="failure" onClick={() => removeCart(item, quantities[index])} className="w-[180px] mt-2">
              削除する
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Cart;
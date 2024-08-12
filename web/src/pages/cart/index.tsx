import { Button, Card, Select } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { getImageUrl } from '../../hooks/awsImageOperations';
import Payment from "../_component/paymentButtonComponent";
import CartPayment from "../_component/Tranfer";
import { useRouter } from 'next/router';
import { TbArrowBackUp } from "react-icons/tb";
import Image from "next/legacy/image";
import { useShoppingCart } from 'use-shopping-cart'

function Cart() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { addItem, cartDetails, removeItem, formattedTotalPrice, cartCount, totalPrice } = useShoppingCart();
  const items = Object.values(cartDetails ?? {}).map((entry) => entry);
  const itemTotalPrice = totalPrice!.toLocaleString();
  const totalPriceVharacters = [...itemTotalPrice];
  totalPriceVharacters.forEach((char, index) => {
    console.log(`Character at index ${index}: ${char}`);
  });


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
  }, [cartDetails]);

  const handleChange = (item: any, selectedQuantity: number) => {
    //一度消してから更新
    removeItem(item.id);
    addItem(item, { count: selectedQuantity })
  };

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
    <div className='flex gap-4 sm:p-8 p-2 flex-wrap ls:justify-normal justify-between'>
      <div className='md:w-[60%] w-full'>
        {items.map((item, index) => (
          <div key={item.id} className='cart-content p-2'>
            <Link href={`item/${item.id}`} className='cart-item'>
              {imageUrls[index] && (
                <Image src={imageUrls[index]} alt="" className="min-h-[160px] max-h-[180px] object-cover" width={180} height={200} />
              )}
              <p className='item-name'>{item.name}</p>
            </Link>
            <div className="px-0 w-[180px]">
              <Select id="countries" className='quantity-select' required value={item.quantity} onChange={(e) => handleChange(item, parseInt(e.target.value))}>
                {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                  <option key={number}>{number + 1}</option>
                ))}
              </Select>
              <Payment items={item} quantity={item.quantity} />
              <Button
                className='rounded-none 
                        xl:w-[180px] 
                        w-full 
                        delete-button
                        mt-2'
                onClick={() => removeItem(item.id)}>削除</Button>
            </div>
          </div>
        ))}
      </div>
      <div className='md:w-[340px] w-full total-content'>
        <div className='flex justify-between items-baseline'>
          <p className='font-bold'>商品合計</p>
          <p className='text-red-600 total-text'>{cartCount}点</p>
        </div>
        <div className='flex justify-between items-baseline'>
          <p className='font-bold'>合計金額</p>
          <p className='text-red-600 total-price'>
            {totalPriceVharacters.map((price, index) => (
              <span key={index}>{price}</span>
            ))}円
          </p>
        </div>
        <CartPayment />
      </div>
    </div>
  );
};
export default Cart;

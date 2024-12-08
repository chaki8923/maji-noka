import { motion } from 'framer-motion'
import { Button, Select } from 'flowbite-react';
import React, { useState } from 'react';
import Link from "next/link";
import Payment from "../_component/paymentButtonComponent";
import CartPayment from "../_component/Tranfer";
import { useRouter } from 'next/router';
import Image from "next/legacy/image";
import { useShoppingCart } from 'use-shopping-cart'
import Head from "next/head";
import styles from './index.module.scss';


function Cart() {
  const router = useRouter();
  const { addItem, cartDetails, removeItem, formattedTotalPrice, cartCount, totalPrice } = useShoppingCart();
  const items = Object.values(cartDetails ?? {}).map((entry) => entry);
  const totalPostage = items.reduce((sum, item) => sum + item.postage, 0);
  console.log(items);
  console.log(totalPostage);
  
  const realTotalPrice = totalPrice! + totalPostage;
  const itemTotalPrice = realTotalPrice!.toLocaleString();
  const totalPriceVharacters = [...itemTotalPrice];

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
          <div className='text-center'>カートは現在空です</div>
          <Button color="blue" onClick={() => handleBack()} className="w-[180px] mt-2">
            戻る
          </Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{ duration: 1 }}
    >
      <Head>
        <title>田中本気農家 | カートの中身</title>
      </Head>

      <div className='flex gap-4 sm:p-8 p-2 flex-wrap ls:justify-normal justify-between'>
        <div className='md:w-[60%] w-full'>
          {items.map((item, index) => (
            <div key={item.id} className={`cart-content flex`}>
              <div>
                <Link href={`item/${item.id}`} className='cart-item'>
                  {item.image_path01 && (
                    <Image src={item.image_path01} alt="" className="min-h-[160px] max-h-[180px] object-cover" width={180} height={200} />
                  )}

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
              <div className={`${styles.cartItemInfo}`}>
                <p>{item.name}</p>
                <div className="text-group mb-6">
                  <h2 className='font-bold text-lg'>価格</h2>
                  <p className='text-gray-900'>¥ {item.removePostagePrice.toLocaleString()} <span>税込</span></p>
                </div>
                <div className="text-group mb-6">
                  <h2 className='font-bold text-lg'>送料</h2>
                  <p className='text-gray-900'>¥ {item.postage}</p>
                </div>
                <div className="text-group mb-6">
                  <h2 className='font-bold text-lg'>合計</h2>
                  <p className='text-gray-900'>¥ {item.price + item.postage}</p>
                </div>
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
    </motion.div>
  );
};
export default Cart;

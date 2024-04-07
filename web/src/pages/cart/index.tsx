import { useCart } from "../../hooks/useCart";
import { Button, Card, Select } from 'flowbite-react';
import type { NextPage } from 'next';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getImageUrl } from '../../pages/awsImageOperations';
import Payment from "../_component/paymentButton";


const Cart: NextPage = () => {
  const { cart, addCart, removeCart } = useCart();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  console.log("カート中身", cart);

  useEffect(() => {
    if (cart) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(cart.map(async (item) => {
          return await getImageUrl('maji-image', `item/${item.id}/item_image_0_${item.id}`, 3600);
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, []);

  return (
    <>
      <header className='px-8 py-4 shadow-md'>
        <h1>Cart Details</h1>
      </header>

      <div className='flex gap-4 p-8'>
        {cart.map((item) => {
          const [quantity, setQuantity] = useState(item.quantity); // 初期値をitem.quantityに設定

          const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
            const selectedQuantity = parseInt(event.target.value);
            setQuantity(selectedQuantity); // 選択された値をquantityステートに更新
          };
          return (
            <Card key={item.id} className='w-80'>
              <p className='flex justify-between items-end'>
                <h4 className="text-gray-800">{item.name}</h4>
              </p>
              <p className='mt-3 font-bold text-xl text-gray-800'>¥{item.price}</p>
              <p className='relative h-52'>
                <img src={imageUrls[0]} alt="" className='' />
              </p>
              <p className='text-sm min-h-[60px]'>{item.description}</p>

              <Select id="countries" required value={quantity} onChange={handleChange}>
                {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                  <option key={number}>{number + 1}</option>
                ))}
              </Select>
              <Payment item={item} quantity={quantity} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
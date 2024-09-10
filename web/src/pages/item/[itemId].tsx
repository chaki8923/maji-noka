import { motion } from 'framer-motion'
import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Payment from "../_component/paymentButtonComponent";
import { Select, Button } from 'flowbite-react';
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import Image from "next/legacy/image";
import { useShoppingCart } from 'use-shopping-cart'
import FadeModal from '../_component/fademodal';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/effect-fade";

export default function Item() {

  const router = useRouter();
  const [isCart, setIsCart] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [orderQuantity, setorderQuantity] = useState<number>(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const itemId = typeof router.query.itemId === 'string' ? parseInt(router.query.itemId, 10) : null;
  const { addItem } = useShoppingCart();
  const { data } = trpc.item.getItemById.useQuery({
    id: itemId ?? 0, // idがnullの場合は0を使用
  }, {
    enabled: itemId !== null, // idがnullでない場合にのみクエリを実行
  });

  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(event.target.value, 10); //数値に変換
    setorderQuantity(quantity); // 選択された値をステートに設定
  }

  const insertCart = () => {
    setIsCart(true);
    setIsVisible(true);
  }

  const closeModal = () => {
    setIsCart(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (!data) {
      const timer = setTimeout(() => {
        router.push('/'); // トップ画面に遷移
      }, 5000); // 5秒後に遷移

      return () => clearTimeout(timer); // クリーンアップ用
    }
  }, [data, router]);


  if (!data) {
    return
  }

  const image_paths = [
    data.image_path01,
    data.image_path02,
    data.image_path03,
    data.image_path04
  ].filter(path => path);


  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{ duration: 1.3 }} //遅延実行
    >
      <div className='lg:flex pt-3 overflow-hidden w-full justify-center pb-10'>
        {isCart ?
          <FadeModal isCart={isCart} setIsVisible={setIsVisible} closeModal={closeModal} /> : null}

        <div className='lg:flex w-full'>
          <div className='lg:w-[70%] w-full'>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              slidesPerView={1}
              effect={"fade"}
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              speed={1000} // スライドが切り替わる時の速度
              navigation // ナビゲーション（左右の矢印）
              pagination={{
                clickable: true,
              }} // ページネーション, クリックで対象のスライドに切り替わる
              className="mainSwiper"
            >

              {image_paths.map((src: string, index: number) => (
                <SwiperSlide key={index} className='main-inner-slide'>
                  <Image src={src} alt="商品画像" layout="fill" objectFit="cover" />
                </SwiperSlide>

              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={image_paths.length}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="subSwiper"
            >
              {image_paths.map((src: string, index: number) => (
                <SwiperSlide key={index}>
                  <Image src={src} alt="商品画像" layout="fill" objectFit="cover" />
                </SwiperSlide>
              ))}

            </Swiper>
          </div>
          <div className='lg:w-[30%] w-full xl:m-auto flex justify-between lg:block item-info'>
            <div className='w-[50%] lg:w-auto p-10 xl:p-0 item-info__inner'>
              <div className="text-group mb-6">
                <h2 className='font-bold text-lg'>商品名</h2>
                <p className='text-gray-900'>{data.name}</p>
              </div>
              <div className="text-group mb-6">
                <p className='text-gray-900'>{data.description}</p>
              </div>
              <div className="text-group mb-6">
                <h2 className='font-bold text-lg'>価格</h2>
                <p className='text-gray-900'>{data.price.toLocaleString()}円</p>
              </div>
              <div className="text-group mb-6">
                <h2 className='font-bold text-lg'>在庫</h2>
                <p className='text-gray-900'>{data.inventory}個</p>
                <span className='text-xs'>ご購入のタイミングによっては表示在庫よりも少ない場合があります</span>
              </div>
            </div>
            <div className='w-[50%] lg:w-auto p-10 xl:p-0 item-info__inner'>
              <div className="text-group mb-6">
                <h2 className='text-lg'>注文数:</h2>
                <Select className="xl:w-[110px] quantity-select" id="categories" required value={orderQuantity} onChange={handleChange}>
                  {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                    <option key={number} >{number + 1}</option>
                  ))}
                </Select>
              </div>
              <div className="text-group mb-6 w-3">
                <Payment items={data} quantity={orderQuantity} />
              </div>
              <div className="mt-2">
                <Button className='rounded-none 
                                mb-2
                                xl:w-[180px] 
                                w-full 
                                text-black 
                                bg-white 
                                cart-button 
                                hover:text-white'
                  onClick={() => {
                    addItem({
                      name: data.name,
                      description: data.description,
                      id: data.id,
                      price: data.price,
                      currency: 'JPY',
                      image: data.image_path01,
                    }, { count: orderQuantity });
                    insertCart();
                  }}>
                  カートに追加する
                </Button>
                <Button onClick={() => router.push('/cart')}
                  className="xl:w-[180px] 
                          w-full 
                          rounded-none 
                          text-black 
                          bg-white 
                          cart-button 
                          hover:text-white">
                  カートへ行く
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
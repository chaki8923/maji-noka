import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/router";
import Payment from "../_component/paymentButton";
import Sidebar from "../_component/sideBar";
import { Select, Button, Toast } from 'flowbite-react';
import { CartItem } from '@/src/types';
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { getImageUrl } from '../../pages/awsImageOperations';
import { FaCartArrowDown } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import { TbShoppingCartPin } from "react-icons/tb";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/effect-fade";
import Loading from '../_component/loading';

export default function Item() {

  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isCart, setIsCart] = useState<Boolean>(false);
  const [orderQuantity, setorderQuantity] = useState<number>(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const itemId = typeof router.query.itemId === 'string' ? parseInt(router.query.itemId, 10) : null;
  const { addCart } = useCart();


  const { data } = trpc.item.getItemById.useQuery<CartItem>({
    id: itemId ?? 0, // idがnullの場合は0を使用
  }, {
    enabled: itemId !== null, // idがnullでない場合にのみクエリを実行
  });
  useEffect(() => {
    if (data && itemId !== null) {
      const fetchImageUrls = async () => {
        const imagesAry = [];
        for (let index = 0; index < data.image_count; index++) {
          const urls = await getImageUrl('maji-image', `item/${data.id}/item_image_${index}_${data.id}`, 3600);
          imagesAry.push(urls)
        }
        setImageUrls(imagesAry);
      };
      fetchImageUrls();
    }
  }, [data]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(event.target.value, 10); //数値に変換
    setorderQuantity(quantity); // 選択された値をステートに設定
  }

  const insertCart = (data: CartItem, orderQuantity: number) => {
    addCart(data, orderQuantity);
    setIsCart(true)

  }

  const closeModal = (event: React.MouseEvent<HTMLSpanElement>) => {
    setIsCart(false)
  };

  if (!data) {
    return <Loading />
  }


  return (
    <div className='lg:flex lg:flex-row-reverse pt-3 overflow-hidden w-full justify-end'>
      {isCart ? 
      <Toast className='fixed top-2/4 left-1/3 z-50 py-9'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">カートに追加しましまた</div>
        <Toast.Toggle onClick={closeModal} />
      </Toast> : null}

      <div className='lg:w-3/5 lg:flex w-full'>
        <div className='lg:w-[95%] w-full'>
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
            {imageUrls.map((src: string, index: number) => (
              <SwiperSlide key={index} className='main-inner-slide'>
                <img src={src} />
              </SwiperSlide>

            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={data.image_count}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="subSwiper"
          >
            {imageUrls.map((src: string, index: number) => (
              <SwiperSlide key={index}>
                <img src={src} />
              </SwiperSlide>
            ))}

          </Swiper>
        </div>
        <div className='lg:w-[240px] w-[340px] m-auto'>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>Name</h2>
            <p className='text-white'>{data.name}</p>
          </div>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>Cmment</h2>
            <p className='text-white'>{data.description}</p>
          </div>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>Price</h2>
            <p className='text-white'>{data.price.toLocaleString()}円</p>
          </div>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>Category</h2>
            <p className='text-white'>{data.categoryName}</p>
          </div>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>在庫</h2>
            <p className='text-white'>{data.inventory}個</p>
          </div>
          <div className="text-group mb-6">
            <h2 className='text-white font-bold text-lg'>注文数</h2>
            <Select className="w-[180px]" id="categories" required value={orderQuantity} onChange={handleChange}>
              {Array.from({ length: 10 }, (_, i) => i).map((number) => (
                <option key={number} >{number + 1}</option>
              ))}
            </Select>
          </div>
          <div className="text-group mb-6 w-3">
            <Payment item={data} quantity={orderQuantity} />
          </div>
          <div className="mt-2">
            <Button color="blue" onClick={() => insertCart(data, orderQuantity)} className="w-[180px] mb-4">
              カートに入れる　<FaCartArrowDown />
            </Button>
            <Button onClick={() => router.push('/cart')} className="w-[180px]">
              カートへ行く　<TbShoppingCartPin />
            </Button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
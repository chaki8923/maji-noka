import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/router";
import Payment from "../_component/paymentButton";
import Sidebar from "../_component/sideBar";
import { Spinner, Select, Button } from 'flowbite-react';
import { CartItem } from '@/src/types';
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { getImageUrl } from '../../pages/awsImageOperations';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import "swiper/css/effect-fade";


export default function Item() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [orderQuantity, setorderQuantity] = useState<number>(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const itemId = typeof router.query.itemId === 'string' ? parseInt(router.query.itemId, 10) : null;
  const { cart, addCart, removeCart } = useCart();

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
    console.log(quantity);

    setorderQuantity(quantity); // 選択された値をステートに設定
  }

  if (!data) {
    return <div className='flex fixed justify-center top-48 w-full'> <Spinner color="info" aria-label="Info spinner example" /></div>;
  }


  return (
    <div className='flex pt-3 overflow-hidden'>
      <Sidebar />
      <div className='item-container'>
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
          className="mainSwiper "
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
      <div className='item-description p-3'>
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
          <Select id="countries" required value={orderQuantity} onChange={handleChange}>
            {Array.from({ length: 10 }, (_, i) => i).map((number) => (
              <option key={number}>{number + 1}</option>
            ))}
          </Select>
        </div>
        <div className="text-group mb-6">
          <Payment item={data} quantity={orderQuantity} />
        </div>
        <div className="mt-2">
          <Button color="blue" onClick={() => addCart(data, orderQuantity)}>
            カートに入れる
          </Button>
          <Button onClick={() => router.push('/cart')}>
            カートへ
          </Button>
        </div>
      </div>
    </div>
  );
}
import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react'; // useCallbackをインポート
import { useRouter } from "next/router";
import Payment from "../_component/paymentButton";
import Sidebar from "../_component/sideBar";
import { Spinner } from 'flowbite-react';
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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const id = typeof router.query.itemId === 'string' ? parseInt(router.query.itemId, 10) : null;
  const { data } = trpc.item.getItemById.useQuery({
    id: id ?? 0, // idがnullの場合は0を使用
  }, {
    enabled: id !== null, // idがnullでない場合にのみクエリを実行
  });
  useEffect(() => {
    if (data && id !== null) {
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
  2

  if (!data) {
    return <div className='flex fixed justify-center top-48'> <Spinner color="info" aria-label="Info spinner example" /></div>;
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
          {/* なんかこうやんないとうまくいかん */}
          <SwiperSlide >
            <img src={imageUrls[0]} />
          </SwiperSlide>
          {data.image_count > 1 && (
            <SwiperSlide >
              <img src={imageUrls[1]} />
            </SwiperSlide>
          )}
          {data.image_count > 2 && (
            <SwiperSlide >
              <img src={imageUrls[2]} />
            </SwiperSlide>
          )}
          {data.image_count > 3 && (
            <SwiperSlide >
              <img src={imageUrls[3]} />
            </SwiperSlide>
          )}

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
          <p className='text-white'>{data.category.name}</p>
        </div>
        <div className="text-group mb-6">
          <h2 className='text-white font-bold text-lg'>在庫</h2>
          <p className='text-white'>{data.inventory}個</p>
        </div>
        <div className="text-group mb-6">
          <Payment item={data}/>
        </div>
      </div>
    </div>
  );
}
import { trpc } from '../../utils/trpc';
import React, { useState, useCallback, useRef, useEffect } from 'react'; // useCallbackをインポート
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Spinner } from 'flowbite-react';
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

  console.log("data", data);


  const slideSettings = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };

  if (!data) {
    return <div className='flex fixed justify-center top-48'> <Spinner color="info" aria-label="Info spinner example" /></div>;
  }


  return (
    <div className='flex justify-around'>
      <div className='item-container'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Thumbs, EffectFade]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          slidesPerView={1} // ハイドレーションエラー対策
          loop={true}
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
      <div className='item-description'>
        <div className="text-group mb-6">
          <h2 className='text-white font-bold text-lg'>Cmment</h2>
          <p className='text-white'>{data.description}</p>
        </div>
        <div className="text-group mb-6">
          <h2 className='text-white font-bold text-lg'>Price</h2>
          <p className='text-white'>{data.price}</p>
        </div>
      </div>
    </div>
  );
}
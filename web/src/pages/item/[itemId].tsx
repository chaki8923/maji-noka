import { trpc } from '../../utils/trpc';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Spinner } from 'flowbite-react';
const { generatePresignedUrlsForFolder } = require('../awsAllItemImage');
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../../styles/swiper.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Item() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const id = Number(router.query.itemId);
  generatePresignedUrlsForFolder('maji-image', `item/${id}/`)
  .then((urls: string[]) => {
    if(urls){
      setImageUrls(urls);
    }
  })
  .catch((error: Error) => {
    console.error('S3Error:', error);
  });

  const { data } = trpc.item.getItemById.useQuery({
    id,
  });

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
    <>
     <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings} // slidesPerViewを指定
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true} // スライドを中央に配置
      loop={true} // スライドをループさせる
      speed={1000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} // スライド表示時間
      navigation // ナビゲーション（左右の矢印）
      pagination={{
        clickable: true,
      }} // ページネーション, クリックで対象のスライドに切り替わる
      className={styles.slideWrapper}
    >
      {imageUrls.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <img src={src} width={640} height={400} alt="" className={styles.slideImage}/>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}
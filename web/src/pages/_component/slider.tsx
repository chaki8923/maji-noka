import { Autoplay } from "swiper/modules";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/legacy/image";
import Loading from './loading';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { trpc } from "@/src/utils/trpc";

export default function Slider() {
    const { data } = trpc.slider.getItemById.useQuery({ id: 1 });
    console.log("data",data);

    if (!data) {
        return 
      }
    
    return (
        <>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    
                }}
                speed={1500} // スライドが切り替わる時の速度
                pagination={{
                    clickable: true,
                }} // ページネーション, クリックで対象のスライドに切り替わる
                className="topSwiper"
            >
                {data.images.map((src: string, index: number) => (
                    <SwiperSlide key={index}>
                        {src ? 
                        <Image src={src} alt="スライダー" layout="fill" className="parallax-image" /> : null
                        }
                    </SwiperSlide>

                ))}
            </Swiper>
        </>
    );
}

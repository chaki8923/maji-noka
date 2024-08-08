import { Autoplay, Navigation, Pagination, Thumbs, EffectFade } from "swiper/modules";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getImageUrl } from '../../hooks/awsimageoperations';
import Image from "next/legacy/image";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { trpc } from "@/src/utils/trpc";

export default function Slider() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const { data: images } = trpc.slider.getItemById.useQuery({ id: 1 });
    useEffect(() => {
        const fetchImageUrls = async () => {
            const imagesAry = [];
            if (images) {
                console.log("iamges", images);
                for (let index = 0; index < images.images.length; index++) {
                    const urls = await getImageUrl('maji-image', `uploads/slider/images/${images.id}/${images.images[index]}`, 3600);
                    imagesAry.push(urls)
                }
                setImageUrls(imagesAry);
            }
        };
        fetchImageUrls();
    }, [images]);

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
                {imageUrls.map((src: string, index: number) => (
                    <SwiperSlide key={index}>
                        {src ? 
                        <Image src={src} alt="スライダー" layout="fill" /> : null
                        }
                    </SwiperSlide>

                ))}
            </Swiper>
        </>
    );
}

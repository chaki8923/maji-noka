import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import {getImageUrl}  from '../../hooks/getAwsImage';
import Link from "next/link";
import { Card, Badge } from 'flowbite-react';
import { useSearchParams } from "next/navigation";
import { useWindowSize } from "../../hooks/useWindowSize";
import Image from "next/legacy/image";

export default function Items() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get("categoryId") ?? 0; // もしnullなら空文字列をデフォルト値とする
  const items = trpc.item.getItemByCategory.useQuery({ category_id: Number(categoryId) });
  const [width, _] = useWindowSize();
  useEffect(() => {
    if (items.data) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(items.data.map(async (item) => {
          return await getImageUrl('maji-image', `item/${item.id}/item_image_0_${item.id}`, 3600);
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, [items.data]);
  if (!items.data) {
    return <div>Loading...</div>;
  }

  if (items.data.length === 0) {
    return (
      <>
        <div>該当の商品はありません</div>
      </>
    )
  }

  return (
    <div className='lg:flex lg:justify-start'>
      <div className="grid gap-2 lg:ml-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-24 justify-items-center px-5 ">
        {items.data.map((item, index) => (
          <Link href={`/item/${item.id}`} key={item.id} className=''>
            <Card
              className="
                xl:w-[300px]
                w-[300px]
                h-[440px]
                "
            >
              <div className='text-center relative'>
                <Image src={imageUrls[index]} alt="商品画像" className='h-48 object-contain w-full' layout="fill"/>
                {item.maji_flag && (
                  <Badge color="pink" className='absolute bottom-0 p-2 border-gray-50 border-2 animate-bounce'>New</Badge>
                )}
              </div>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="tracking-tight text-gray-900 dark:text-white font-light text-base index-description">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price.toLocaleString()}円</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
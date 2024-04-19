import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../pages/awsImageOperations';
import Link from "next/link";
import Sidebar from "../_component/sideBar";
import { useSearchParams } from "next/navigation";
import { Card, Badge } from 'flowbite-react';
import Loading from '../_component/loading';
import { useWindowSize } from "../../hooks/useWindowSize";


export default function Items() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const items = trpc.item.getItems.useQuery();
  const [width, _] = useWindowSize();

  useEffect(() => {
    if (items.data) {
        const fetchImageUrls = async () => {
        const urls = await Promise.all(items.data.map(async (item) => {
          return await getImageUrl(
            'maji-image',
            `item/${item.id}/item_image_0_${item.id}`,
            3600
          );
        }));
        setImageUrls(urls);
      };
      fetchImageUrls();
    }
  }, [items.data]);

  if (!items.data) {
    return <Loading />
  }
  if (keyword) {
    items.data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return (
    <div className='lg:flex lg:justify-start'>
      {width > 1124 ? <Sidebar /> : null}
      <div className="grid gap-2 lg:ml-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 mb-24 justify-items-center px-5 ">
        {items.data.map((item, index) => (
          <Link href={`item/${item.id}`} key={item.id} className='w-full flex justify-center lg:w-auto'>
            <Card
              className="
                xl:w-[300px]
                w-full
                h-[440px]
                "
            >
              <div className='text-center relative'>
                <img src={imageUrls[index]} alt="" className='h-48 object-contain w-full' />
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
      {width < 1124 ? <Sidebar /> : null}
    </div>
  );
}

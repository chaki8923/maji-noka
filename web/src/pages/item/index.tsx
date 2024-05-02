import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../hooks/awsImageOperations';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, Badge } from 'flowbite-react';
import Loading from '../_component/loading';
import { useWindowSize } from "../../hooks/useWindowSize";
import Image from "next/image";

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
      <div className="
      grid 
      px-2
      lg:ml-6 
      lg:grid-cols-3 
      sm:grid-cols-2 
      grid-cols-1
      mb-24 
      justify-items-center 
      md:px-5 
      gap-2
      ">
        {items.data.map((item, index) => (
          <Link href={`item/${item.id}`} key={item.id} className='w-full flex justify-center lg:w-auto'>
            <Card
              className="max-w-sm overflow-hidden relative"
              renderImage={() => {
                if (imageUrls && imageUrls[index]) {
                  return <Image width={500} height={280} src={imageUrls[index]} alt={`image ${index}`} className="min-h-[280px] max-h-[280px] object-cover" />;
                } else {
                  return <Image width={500} height={500} src="/default-image.jpg" alt="Default Image" className="h-[280px]" />;
                }
              }}
            >
               {item.maji_flag && (
                  <Badge color="pink" className='absolute top-2 left-0 p-2 border-gray-50 border-2 animate-bounce'>New</Badge>
                )}

              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 index-description">
                {item.description}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
              {item.price.toLocaleString()}円
              </p>
            </Card>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

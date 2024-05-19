import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../hooks/awsImageOperations';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, Badge } from 'flowbite-react';
import Loading from '../_component/loading';
import Image from "next/image";
import { Pagination } from "flowbite-react";
import { Items } from '@/src/types';

export default function Page() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState<any>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const limit = 1;

  const allItemsCount = trpc.item.allItemsCount.useQuery();
  const items = trpc.item.getItems.useQuery({ limit: limit, offset: currentPage - 1 });
  useEffect(() => {
    if (items.data && allItemsCount.data) {
      setProducts(items.data);
      const pageCount = Math.ceil(allItemsCount.data / limit);
      setTotalPage(pageCount)
    }
  }, [items.data, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (products) {
      const fetchImageUrls = async () => {
        const urls = await Promise.all(products.map(async (item: Items) => {
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
  }, [products]);

  if (!items.data) {
    return <Loading />
  }
  if (keyword) {
    items.data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return (
    <>
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
          {products.map((item: Items, index: number) => (
            <Link href={`item/${item.id}`} key={item.id} className='w-full flex justify-center sm:w-[320px] item-card'>
              <Card
                className="w-full overflow-hidden relative rounded-none bg-transparent"
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

                <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white item-title">
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
      {allItemsCount.data! > limit ? (
        <Pagination
          className="text-center mb-4"
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : null}
    </>
  );
}
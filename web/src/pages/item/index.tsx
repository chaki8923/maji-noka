import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, Badge, Pagination } from 'flowbite-react';
import Loading from '../_component/loading';
import Image from "next/image";
import { Items } from '@/src/types';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState<any>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const limit = 8;

  const allItemsCount = trpc.item.allItemsCount.useQuery();
  const items = trpc.item.getItems.useQuery({ limit: limit, offset: currentPage - 1 });
  console.log("items",items.data);
  
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


  if (!items.data) {
    return <Loading />
  }


  return (
    <>
      <h2 className='page-title'>商品リスト</h2>
      <style jsx>{`
      .page-title:before {
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 10px;
          background: repeating-linear-gradient(#c9efcb 0 2px, transparent 2px 4px),
            repeating-linear-gradient(90deg, #c9efcb 0 2px, transparent 2px 4px);
          content: '';
        }
      `}</style>
      <div className='lg:flex lg:justify-start'>
        <div className="
                        grid 
                        px-2
                        lg:grid-cols-3
                        sm:grid-cols-2 
                        grid-cols-1
                        mb-24 
                        justify-items-center 
                        md:px-5 
                        gap-12
                        mx-auto
                        ">
          {products.map((item: Items, index: number) => (
            <Link href={`item/${item.id}`} key={item.id} className='sm:mb-8 w-full flex justify-center sm:w-[360px] item-card'>
              <Card
                className="w-full overflow-hidden relative rounded-none bg-transparent flow-card"
                renderImage={() => {
                  if (item.image_path01) {
                    return <div className='image-wrapper'><Image width={500} height={380} src={item.image_path01} alt={`image ${index}`} className="min-h-[240px] max-h-[240px] object-cover" /></div>;
                  } else {
                    return <Image width={500} height={500} src="/default-image.jpg" alt="Default Image" className="h-[280px]" />;
                  }
                }}
              >
                {item.maji_flag && (
                  <span className="absolute top-0 left-0 bg-red-100 text-red-800 font-medium me-2 p-2 rounded dark:bg-gray-700 dark:text-red-300 border border-red-300">新入荷！</span>
                )}

                <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white item-title text-center">
                  {item.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
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
import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import {getImageUrl} from '../../hooks/awsImageOperations';
import Link from "next/link";
import { Card, Badge } from 'flowbite-react';
import SearchForm from "../_component/searchForm";
import { useSearchParams } from "next/navigation";
import Image from 'next/image';

interface Keyword {
  keyword?: string | undefined;
}

export default function Items() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const keywordValue = searchParams?.get("keyword") ?? ''; // もしnullなら空文字列をデフォルト値とする
  const keyword: Keyword = { keyword: keywordValue };
  const items = trpc.item.getItemByKeyword.useQuery(keyword);

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
        <SearchForm />
        <div>該当の商品はありません</div>
      </>
    )
  }

  return (
    <div className='lg:flex lg:flex-row-reverse'>
      <div className="grid gap-2 lg:ml-6 lg:grid-cols-3 grid-cols-2 mb-24 justify-items-center">
        {items.data.map((item, index) => (
          <Link href={`/item/${item.id}`} key={item.id}>
            <Card
              className="max-w-[340px] min-w-[300px] max-h-[440px] min-h-[440px]"
            >
              <div className='text-center relative'>
                <Image src={imageUrls[index]} alt="" className='h-48 object-contain w-full' layout="fill" />
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
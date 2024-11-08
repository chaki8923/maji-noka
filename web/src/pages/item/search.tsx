import { trpc } from '../../utils/trpc';
import React from 'react';
import Link from "next/link";
import { Card, Badge } from 'flowbite-react';
import SearchForm from "../_component/searchFormComponent";
import { useSearchParams } from "next/navigation";
import Image from "next/legacy/image";

interface Keyword {
  keyword?: string | undefined;
}

export default function Items() {
  const searchParams = useSearchParams();
  const keywordValue = searchParams?.get("keyword") ?? ''; // もしnullなら空文字列をデフォルト値とする
  const keyword: Keyword = { keyword: keywordValue };
  const items = trpc.item.getItemByKeyword.useQuery(keyword);

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
              renderImage={() => {
                if (item.image_path01) {
                  return <div className='image-wrapper'><Image width={500} height={380} src={item.image_path01} alt={`image ${index}`} className="min-h-[240px] max-h-[240px] object-cover" /></div>;
                } else {
                  return <Image width={500} height={500} src="/default-image.jpg" alt="Default Image" className="h-[280px]" />;
                }
              }}
            >
              <div className='text-center relative'>
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
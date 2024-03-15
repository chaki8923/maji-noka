import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../pages/awsImageOperations';
import Link from "next/link";
import { SearchForm } from "../_component/searchForm";
import { useSearchParams } from "next/navigation";
import { Card, Spinner } from 'flowbite-react';



export default function Items() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const items = trpc.item.getItems.useQuery();


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
    return (
      <Spinner color="info" aria-label="Info spinner example" />
    )
  }
  if (keyword) {
    const result = items.data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    console.log("result", result);
  }

  return (
    <>
      <SearchForm />
      <div className="grid gap-2 lg:grid-cols-4">
        {items.data.map((item, idx) => (
          <Link href={`item/${item.id}`} key={item.id}>
            <Card
              className="max-w-sm"
            >
              <div className='text-center'>
                <img src={imageUrls[idx]} alt="" className='h-48 object-contain w-full'/>
              </div>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.description}
              </h5>
              <div className="mb-5 mt-2.5 flex items-center">
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.price.toLocaleString()}円</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
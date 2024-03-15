import { trpc } from '../../utils/trpc';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from "next/router";
import { getImageUrl } from '../awsImageOperations';
import Link from "next/link";
import { Card, Spinner } from 'flowbite-react';


export default function Item() {
  const router = useRouter();
  const id = Number(router.query.itemId);

  const { data } = trpc.item.getItemById.useQuery({
    id,
  });

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (data) {
      const fetchImageUrl = async () => {
        try {
          const url = await getImageUrl('maji-image', `item/${data.id}/item_image_0_${data.id}`, 3600);
          setImageUrl(url);
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      };
      fetchImageUrl();
    }
  }, [data]); // コンポーネントがマウントされたときのみ実行
  if (!data) {
    return <div> <Spinner color="info" aria-label="Info spinner example" /></div>;
  }

  return (
    <>
      <Card
        className="max-w-sm"
      >
        <div className='text-center'>
          <img src={imageUrl} alt="" className='h-48 object-contain w-full' />
        </div>
        <h5 className="ymca text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.name}
        </h5>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {data.description}
        </h5>
        <div className="mb-5 mt-2.5 flex items-center">
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{data.price.toLocaleString()}円</span>
        </div>
      </Card>
    </>
  );
}
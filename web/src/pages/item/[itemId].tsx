import { trpc } from '../../utils/trpc';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from "next/router";
import { getImageUrl } from '../awsImageOperations';
import Link from "next/link";


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
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link href={`/`} className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
        Go List
      </Link>
      <div>
        <p>{data.name}</p>
        <img src={imageUrl} alt="" />
      </div>
    </>
  );
}
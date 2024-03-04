import { trpc } from '../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../pages/awsImageOperations';


export default function Items() {
  const items = trpc.item.getItems.useQuery();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
  return (
    <>
      <div className="grid gap-2 lg:grid-cols-4">
        {items.data.map((item, idx) => (
          <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={item.id}>
            <img
              className="object-contain"
              src={imageUrls[idx]}
              alt="image"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-blue-600">

                {item.name}
              </h4>
              <p className="mb-2 leading-normal">
                {item.price}
              </p>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
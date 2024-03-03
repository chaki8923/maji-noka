import { trpc } from '../utils/trpc';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from './awsImageOperations';
import Items from '../components/items';

export default function IndexPage() {
  const items = trpc.item.getItems.useQuery();
  const [imageUrls, setImageUrls] = useState<string[]>([]);


  return (
    <Items />
  );
}


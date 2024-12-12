import { motion } from 'framer-motion'
import { trpc } from '../../utils/trpc';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, Pagination } from 'flowbite-react';
import Image from "next/image";
import Head from 'next/head';
import { Items } from '@/src/types';
import styles from './index.module.scss';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState<any>([]);
  // const keyword = searchParams?.get("keyword");
  const limit = 8;

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

  if (!items.data) {
    return;
  }

  const itemListElement = products.map((product: Items, index: number) => ({
    "@type": "ListItem",
    "position": index + 1, // リストの順序
    "item": {
      "@type": "Product",
      "name": product.name,
      "image": product.image_path01,
      "description": product.description,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "JPY",
        "price": product.price,
        "availability": `InStock`,
        "url": `https://web.maji-noka.com/item/${product.id}/`,
      },
    },
  }));

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    description: "埼玉県熊谷市の激アツ農家の本気の商品",
    name: "商品一覧ページ",
    "itemListElement": itemListElement
  };


  return (
    <motion.div
      initial={{ opacity: 0 }} // 初期状態
      animate={{ opacity: 1 }} // マウント時
      exit={{ opacity: 0 }}    // アンマウント時
      transition={{ duration: 1.3 }} //遅延実行y
    >
      <Head>
        {/* 構造化マークアップをJSON-LDで埋め込む */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <h2 className='page-title'>商品リスト</h2>

      <div className='lg:flex lg:justify-start'>
        <div className="
                      grid 
                      px-2
                      lg:grid-cols-3
                      sm:grid-cols-2 
                      grid-cols-2
                      mb-24 
                      justify-items-center 
                      md:px-5 
                      gap-2
                      mx-auto
                      ">
          {products.map((item: Items, index: number) => (
            item.inventory > 0 ? (
              <Link href={`item/${item.id}`} key={item.id} className='sm:mb-8 w-full flex justify-center sm:w-[360px] item-card'>
                <Card
                  className="w-full overflow-hidden relative rounded-none bg-transparent flow-card"
                  renderImage={() => {
                    if (item.image_path01) {
                      return <div className='image-wrapper'><Image width={500} height={380} src={item.image_path01} alt={`image ${index}`} className={`min-h-[240px] max-h-[240px] object-cover ${styles.itemImage}`} /></div>;
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
            ) : (//在庫がない場合
              <Card
                key={item.id}
                className="w-full overflow-hidden relative rounded-none bg-transparent flow-card"
                renderImage={() => {
                  if (item.image_path01) {
                    return <div className='image-wrapper'><Image width={500} height={380} src={item.image_path01} alt={`image ${index}`} className={`min-h-[240px] max-h-[240px] object-cover ${styles.itemImage}`} /></div>;
                  } else {
                    return <Image width={500} height={500} src="/default-image.jpg" alt="Default Image" className="h-[280px]" />;
                  }
                }}
              >
                <Image src="/soldout.png"
                  height={250}
                  width={250}
                  className={`${styles.soldOut}`}
                  alt="売り切れ" />
                <h5 className="text-2xl tracking-tight text-gray-900 dark:text-white item-title text-center">
                  {item.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
                  {item.price.toLocaleString()}円
                </p>
              </Card>

            )
          ))}
        </div>
      </div>
      {allItemsCount.data! > limit ? (
        <Pagination
          className="text-center mb-4"
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          previousLabel="前へ" // 「Previous」を「前のページ」に
          nextLabel="次へ" // 「Next」を「次のページ」に
        />
      ) : null}
    </motion.div>
  );
}
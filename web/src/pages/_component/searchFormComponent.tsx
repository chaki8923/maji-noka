import React, { ChangeEvent, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";


export default function SearchForm(){
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");
  useEffect(() => {
    // URLからクエリパラメーターを取得して、キーワードを設定
    const { keyword: queryKeyword } = router.query;
    if (typeof queryKeyword === 'string') {
      setKeyword(queryKeyword);
    }
  }, [router.query]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }

  return (
    <>
      <div className="relative w-2/5 mt-2 mb-3">
        <div className="absolute left-4 top-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div className="absolute right-4 top-3 text-blue-500 cursor-pointer">
          <Link href={`/item/search?keyword=${keyword}`} className="ounded bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white p-2 font-semibold">
            Search
          </Link>
        </div>
        <input
          value={keyword}
          className="text-gray-800 w-full rounded-full hover:shadow-lg focus:shadow-lg focus:outline-0 p-2.5 border pl-10"
          type="text"
          placeholder="商品名を入力してください😗"
          onChange={handleInputChange} />
      </div>
    </>
  )
}
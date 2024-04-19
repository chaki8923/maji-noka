
'use client';

import { Sidebar } from 'flowbite-react';
import {
   HiChartPie, 
   HiInbox, 
   HiShoppingBag, 
   HiUser } from 'react-icons/hi';

import { BiSolidCategoryAlt } from "react-icons/bi";
import { trpc } from '../../utils/trpc';

const SidebarComponent = () => {
  const categories = trpc.category.getCategories.useQuery();
  return (
    <Sidebar aria-label="Sidebar multi-level with dropdown example"  className='lg:w-60 w-full mt-2 lg:mt-0'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Home
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidCategoryAlt} label="category">
            {categories.data && categories.data.map((cat, idx) => (
              <Sidebar.Item key={idx} href={`/item/category?categoryId=${cat.id}`}>{cat.name}</Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Item href="/signup" icon={HiInbox}>
            会員登録
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiUser}>
            ログイン
          </Sidebar.Item>
          <Sidebar.Item href="/contact" icon={HiShoppingBag}>
             お問い合せ
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarComponent;
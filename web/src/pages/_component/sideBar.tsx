
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
    <Sidebar aria-label="Sidebar multi-level with dropdown example"  className='lg:w-60 w-full'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Home
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidCategoryAlt} label="category">
            {categories.data && categories.data.map((cat, idx) => (
              <Sidebar.Item key={idx} href={`/item/category?categoryId=${cat.id}`}>{cat.name}</Sidebar.Item>
            ))}
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SidebarComponent;
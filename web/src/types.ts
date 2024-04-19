import { items, User, sliders, Purchase } from "@prisma/client";

// export type Items = items;
export type Items = items;
export type Slider = sliders;
export type Customer = User;
export type purchase= Purchase;
export type PurchaseWithItem = Purchase & {item: Items};
export type ItemWithAuthor = Items & { author: Customer };
export type CartItem = Items & { 
    quantity: number; 
    categoryName: string;
 };
 

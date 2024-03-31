import { items, User, sliders } from "@prisma/client";

// export type Items = items;
export type Items = items;
export type Slider = sliders;
export type Customer = User;
export type ItemWithAuthor = Items & { author: Customer };
export type CartItem = Items & { 
    quantity: number; 
    categoryName: string;
    // deleted_at: string | null;
    // created_at: string;
    // updated_at: string;
 };
 

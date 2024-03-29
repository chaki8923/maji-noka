import { items, User } from "@prisma/client";

export type Items = items;
export type Customer = User;
export type ItemWithAuthor = Items & { author: Customer };
export type CartItem = Items & { 
    quantity: number; 
    categoryName: string;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
 };


export interface Items {
    name: string;
    id: number;
    price: number;
    description: string;
    image_count: number;
    maji_flag: boolean;
    postage: number | null;
    inventory: number | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}
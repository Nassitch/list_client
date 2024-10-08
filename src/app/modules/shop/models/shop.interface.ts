import { Category } from "../../category/models/category.interface";

export interface Shop {
    id: number;
    createdAt: string;
    isCompleted: boolean;
    count: number;
    categories: Category[];
}
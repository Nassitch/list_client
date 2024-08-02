import { Item } from "../../item/models/item.interface";

export interface CategoryResponse {
    id: number;
    name: string;
    picture: string;
    createdAt: string;
    items: Item[];
}
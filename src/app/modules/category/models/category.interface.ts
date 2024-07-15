import { Item } from "../../item/models/item.interface";

export interface Category {
    id: number;
    name: string;
    createdAt: string;
    picture: string,
    items: Item[]
}
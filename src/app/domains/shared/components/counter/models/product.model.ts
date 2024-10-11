import { Category } from "./category.models";

export interface Product{
    id: number;
    title: string;
    description: String;
    price: number;
    images: string[];
    creationAt: string;
    category: Category
}
import { User } from "./User.model";
import { Category } from "./Category.model";

export type BlogPost = {
    id?: string;
    title: string;
    text: string;
    author: User;
    category: Category[];
};

//Omit: export type FoodPost = Omit<Food, "foodId">;
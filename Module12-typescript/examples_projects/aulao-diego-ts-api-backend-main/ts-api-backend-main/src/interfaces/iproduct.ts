import ICategory from "./icategory";

export default interface IProduct {
    id?: string;
    name: string;
    price: number;
    category: string | ICategory;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
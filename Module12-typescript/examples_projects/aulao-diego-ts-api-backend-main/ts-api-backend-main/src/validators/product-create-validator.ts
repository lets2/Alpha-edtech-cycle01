import { Request, Response, NextFunction } from "express";
import Validator from "./validator";

export default function productCreateValidator(req: Request, res: Response, next: NextFunction) {
    let errors: string[] = (req.query.errors as string[]) || [];
    const { name, price, category } = req.body;
    errors = [...errors, ...Validator.string("name", name, 3, 50)];
    errors = [...errors, ...Validator.number("price", price, 0)];
    errors = [...errors, ...Validator.uuid("category", category)];

    req.query.errors = errors;

    next();
}

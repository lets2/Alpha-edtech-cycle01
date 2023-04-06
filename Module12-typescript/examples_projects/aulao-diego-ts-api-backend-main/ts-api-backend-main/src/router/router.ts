import express from "express";
import ProductController from "../controllers/product-controller";
import productCreateValidator from "../validators/product-create-validator";
export default class Router {
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        const products = new ProductController();
        this.router.get("/products", products.list.bind(products));
        this.router.post("/products", productCreateValidator, products.insert.bind(products));
    }

    public get(): express.Router {
        return this.router;
    }
}

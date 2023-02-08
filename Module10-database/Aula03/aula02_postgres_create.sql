CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	"delete_at" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.products" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"category_id" integer NOT NULL,
	"brand_id" integer NOT NULL,
	"price" DECIMAL NOT NULL,
	"user_id" integer NOT NULL,
	"quant_available" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	"delete_at" TIMESTAMP NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.shopping_carts" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	"delete_at" TIMESTAMP NOT NULL,
	CONSTRAINT "shopping_carts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.product_brands" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "product_brands_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.carts_products" (
	"cart_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantify" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	"delete_at" TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cart_status" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "cart_status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.orders" (
	"id" serial NOT NULL,
	"cart_id" integer NOT NULL,
	"order_status_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"update_at" TIMESTAMP NOT NULL,
	"delete_at" TIMESTAMP NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.order_status" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "order_status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("brand_id") REFERENCES "product_brands"("id");
ALTER TABLE "products" ADD CONSTRAINT "products_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_fk1" FOREIGN KEY ("status_id") REFERENCES "cart_status"("id");



ALTER TABLE "carts_products" ADD CONSTRAINT "carts_products_fk0" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id");
ALTER TABLE "carts_products" ADD CONSTRAINT "carts_products_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id");












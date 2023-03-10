const { db } = require("./src/repositories/index.js");
const {
    insertCategory,
} = require("./src/repositories/products/insertCategory.js");
const {
    insertProduct,
} = require("./src/repositories/products/insertProduct.js");

const {
    updateProduct,
} = require("./src/repositories/products/updateProduct.js");

const {
    selectProductByCategory,
} = require("./src/repositories/products/selectProductByCategory.js");

const {
    selectProductByBrand,
} = require("./src/repositories/products/selectProductByBrand.js");

const {
    deleteProductById,
} = require("./src/repositories/products/deleteProductById.js");

async function dbConnect() {
    return await db.connect();
}

//console.log(db.connect());
//console.log("Deu certo!");

/*
//FUNCTION INSERT NEW CATEGORY
(async function query() {
    const conn = await dbConnect();

    ///const sql = "SELECT NOW();";
    ///const resp = await conn.query(sql);
    ///console.log(resp);
    ///console.log(resp.rows[0].now);
    const resp = await insertCategory(conn, { categoryName: "Adidas" });
    console.log(resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
    // Encerrando o pool, não sei se precisa ficar aqui.
    //// conn.end(() => {
    //// console.log("pool has ended");
    //// });
})();
*/

/*
//FUNCTION INSERT NEW PRODUCT
(async function query() {
    const conn = await dbConnect();
    const resp = await insertProduct(conn, {
        productName: "Roupa adicionada",
        categoryId: "c451d080-493e-4796-b7f9-770d0b40e3f5",
        brandId: "97df59bf-4d9d-4ec2-bace-6e474e75a218",
        productPrice: 333,
        productQuant: 5,
    });

    console.log("Resposta da query realizada:", resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
})();
*/
/*
//FUNCTION UPDATE PRODUCT BY ID
(async function query() {
    const conn = await dbConnect();
    const resp = await updateProduct(conn, {
        productId: "a97669d2-de8c-4f81-ac86-9e28c2b83e78",
        productName: "Roupa atualizada prod",
        categoryId: "c451d080-493e-4796-b7f9-770d0b40e3f5",
        brandId: "97df59bf-4d9d-4ec2-bace-6e474e75a218",
        productPrice: 5000,
        productQuant: 24,
    });

    console.log("Resposta da query realizada:", resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
})();
*/

/*
//FUNCTION SELECT PRODUCTS BY CATEGORY AND ORDER BY PRICE
(async function query() {
    const conn = await dbConnect();
    const resp = await selectProductByCategory(conn, {
        categoryName: "Camisa",
    });

    console.log("Resposta da query realizada:", resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
})();
*/

/*
//FUNCTION SELECT PRODUCTS BY BRAND AND ORDER BY PRICE
(async function query() {
    const conn = await dbConnect();
    const resp = await selectProductByBrand(conn, {
        brandName: "Gucci",
    });

    console.log("Resposta da query realizada:", resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
})();
*/

/*
//FUNCTION DELETE PRODUCT BY ID
(async function query() {
    const conn = await dbConnect();
    try {
        const resp = await deleteProductById(conn, {
            productId: "a97669d2-de8c-4f81-ac86-9e28c2b83e78",
        });

        console.log("Resposta da query realizada:", resp);
    } catch (err) {
        console.error(`Error deleting product: ${err.message}`);
    } finally {
        conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    }

    console.log("Conexão liberada para ser reaproveitada");
})();
*/

//FUNCTION SELECT ALL PRODUCTS WITH JOIN CATEGORY AND BRAND
(async function query() {
    const conn = await dbConnect();
    const resp = await selectProductByBrand(conn);

    console.log("Resposta da query realizada - LISTA COMPLETA:", resp);

    conn.release(); //libera essa conexão/client para que fique disponível para novas conexoes
    console.log("Conexão liberada para ser reaproveitada");
})();

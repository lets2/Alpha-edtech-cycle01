async function addProductToCart(conn, { cartId, productId }) {
    const sql = `
    INSERT INTO carts_products
    (cart_id,product_id, quantify,created_at)
    VALUES
    ($1,
     $2,
     1,
     now())
     RETURNING *;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [cartId, productId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Add product to cart";
    }

    return {
        productId: resp.rows,
    };
}

module.exports = {
    addProductToCart: addProductToCart,
};

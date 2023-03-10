async function countProductsInCart(conn, { cartId }) {
    const sql = `
    SELECT COUNT(*)
    FROM carts_products
    WHERE carts_products.cart_id=$1;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [cartId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Count total of products in cart";
    }

    return {
        productId: resp.rows,
    };
}

module.exports = {
    countProductsInCart: countProductsInCart,
};

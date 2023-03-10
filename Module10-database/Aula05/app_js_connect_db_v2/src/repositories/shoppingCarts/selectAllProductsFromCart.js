async function selectAllProductsFromCart(conn, { cartId }) {
    const sql = `
    SELECT carts_p.cart_id,carts_p.product_id,p.name,p.price
    FROM carts_products AS carts_p
    JOIN products AS p ON  p.id = carts_p.product_id
    WHERE carts_p.cart_id=$1;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [cartId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "List all products from cart";
    }

    return {
        productId: resp.rows,
    };
}

module.exports = {
    selectAllProductsFromCart: selectAllProductsFromCart,
};

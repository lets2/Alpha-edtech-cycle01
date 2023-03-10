async function calculateTotalPriceInCart(conn, { cartId }) {
    const sql = `
    SELECT SUM(price)
    FROM carts_products
    JOIN products ON carts_products.product_id = products.id
    WHERE carts_products.cart_id =$1;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [cartId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Sum total price of products in cart";
    }

    return {
        productId: resp.rows,
    };
}

module.exports = {
    calculateTotalPriceInCart: calculateTotalPriceInCart,
};

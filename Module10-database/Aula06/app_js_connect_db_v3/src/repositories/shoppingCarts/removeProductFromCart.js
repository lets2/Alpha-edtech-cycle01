async function removeProductFromCart(conn, { cartId, productId }) {
    const sql = `
    DELETE FROM carts_products 
    WHERE 
	cart_id =$1
	AND product_id = $2
    RETURNING *;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [cartId, productId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Remove product from cart";
    }

    return {
        productId: resp.rows,
    };
}

module.exports = {
    removeProductFromCart: removeProductFromCart,
};

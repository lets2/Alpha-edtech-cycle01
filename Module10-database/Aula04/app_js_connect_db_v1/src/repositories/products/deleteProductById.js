async function deleteProductById(conn, { productId }) {
    const sql = `
        DELETE FROM products WHERE id = $1 RETURNING id;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [productId]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Delete product";
    }

    return {
        productId: resp.rows[0].id,
    };
}

module.exports = {
    deleteProductById: deleteProductById,
};

async function updateProduct(
    conn,
    { productId, productName, categoryId, brandId, productPrice, productQuant }
) {
    const sql = `
    UPDATE products SET name = $2,category_id=$3,brand_id=$4, price=$5, quant_available=$6,
     update_at = now()     WHERE id = $1 RETURNING *;
    `;

    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [
        productId,
        productName,
        categoryId,
        brandId,
        productPrice,
        productQuant,
    ]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        console.log(resp, resp.rows);
        throw "Update product";
    }

    return {
        productId: resp.rows[0].id,
    };
}

module.exports = {
    updateProduct: updateProduct,
};

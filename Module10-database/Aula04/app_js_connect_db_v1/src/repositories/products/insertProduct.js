async function insertProduct(
    conn,
    { productName, categoryId, brandId, productPrice, productQuant }
) {
    const sql = `
        INSERT INTO products (id, name,category_id,brand_id,price,quant_available,created_at)
        VALUES (gen_random_uuid(), $1,$2,$3,$4,$5, now())
        RETURNING id;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [
        productName,
        categoryId,
        brandId,
        productPrice,
        productQuant,
    ]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Saving new product";
    }

    return {
        productId: resp.rows[0].id,
    };
}

module.exports = {
    insertProduct: insertProduct,
};

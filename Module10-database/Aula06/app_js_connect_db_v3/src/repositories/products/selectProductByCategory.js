async function selectProductByCategory(conn, { categoryName }) {
    const sql = `
        SELECT products.id, products.name, products.price,
        categories.name AS category_name,product_brands.name AS brand_name
        FROM products
        JOIN categories ON products.category_id = categories.id
        JOIN product_brands ON products.brand_id = product_brands.id
        WHERE categories.name = $1
        ORDER BY products.price;
        `;

    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [categoryName]);
    // console.log("veja a resposta do select", resp);
    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        console.log(resp, resp.rows);
        throw "select product";
    }

    return {
        productFiltered: resp.rows,
    };
}

module.exports = {
    selectProductByCategory: selectProductByCategory,
};

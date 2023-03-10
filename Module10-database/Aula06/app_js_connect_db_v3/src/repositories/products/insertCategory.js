async function insertCategory(conn, { categoryName }) {
    const sql = `
        INSERT INTO categories (id, name)
        VALUES (gen_random_uuid(), $1)
        RETURNING id;
    `;
    //quando o sql tem parâmetro ($1,$2), query() recebe um segundo argumento correspondente
    const resp = await conn.query(sql, [categoryName]);

    //  verdadeir implica que a query não tinha nenhum comando de retorno (como RETURNING *)
    if (resp.rows.length === 0) {
        throw "Saving product categories";
    }

    return {
        categoryId: resp.rows[0].id,
    };
}

module.exports = {
    insertCategory: insertCategory,
};

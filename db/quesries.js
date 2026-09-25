const pool = require("./pool");

async function getAllCategories() {
  // เขียน SQL ตรงนี้
   const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
    return rows;
}


async function updateCategory(id, name) {
  await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2",
    [name, id]
  );
}

async function insertCategory(name) {
  await pool.query(
    "INSERT INTO categories (name) VALUES ($1)",
    [name]
  );
}

async function getCategory(id) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY id");
  return rows;
}

async function insertItem(name, quantity, price, description, categoryId) {
  await pool.query("INSERT INTO items (name, quantity, price, description, category_id) VALUES ($1, $2, $3, $4, $5)",
    [name, quantity, price, description, categoryId]
  );
}

async function updateItem(id, name, quantity, price, description, categoryId
) {
  await pool.query(
    `UPDATE items
     SET name = $1,
         quantity = $2,
         price = $3,
         description = $4,
         category_id = $5
     WHERE id = $6`,
    [name, quantity, price, description, categoryId, id]
  );
}


async function getItem(id) {
    const { rows } = await pool.query(
    "SELECT * FROM items WHERE id = $1",
    [id]
  );

  return rows[0]
}

module.exports = {
    getAllCategories,
    getCategory,
    getAllItems,
    getItem,
    insertItem,
    insertCategory,
    updateCategory,
    updateItem
};
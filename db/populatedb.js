// db/populatedb.js

require("dotenv").config();

const { Client } = require("pg");

const client = new Client();

async function main() {
  try {
    await client.connect();
    await client.query("BEGIN");

    // 1. Create categories if they don't exist.
    await client.query(`
      INSERT INTO categories (name)
      VALUES
        ('Fruits'),
        ('Vegetables'),
        ('Dairy'),
        ('Meat'),
        ('Beverages')
      ON CONFLICT (name) DO NOTHING
    `);

    // 2. Insert sample items without duplicating names.
    await client.query(`
      INSERT INTO items
        (name, quantity, price, description, category_id)
      SELECT
        seed.name,
        seed.quantity,
        seed.price,
        seed.description,
        categories.id
      FROM (
        VALUES
          ('Apple', 50, 35.00, 'Fresh red apples', 'Fruits'),
          ('Broccoli', 30, 25.50, 'Organic green broccoli', 'Vegetables'),
          ('Whole Milk 1L', 20, 65.00, 'Pasteurized whole milk', 'Dairy'),
          ('Chicken Breast', 15, 85.00, 'Fresh skinless chicken breast', 'Meat'),
          ('Orange Juice', 40, 45.00, '100% natural orange juice', 'Beverages')
      ) AS seed(name, quantity, price, description, category_name)
      JOIN categories
        ON categories.name = seed.category_name
      WHERE NOT EXISTS (
        SELECT 1
        FROM items
        WHERE items.name = seed.name
      )
    `);

    await client.query("COMMIT");
    console.log("Database seeding completed.");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
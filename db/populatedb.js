// db/populatedb.js
require("dotenv").config();

const { Client } = require("pg");

const client = new Client();

async function main() {
  try {
    await client.connect();

    await client.query(
    `INSERT INTO items (name, quantity, price, description, category_id)
    VALUES
    ('Apple', 50, 35.00, 'Fresh red apples', 1),
    ('Broccoli', 30, 25.50, 'Organic green broccoli', 2),
    ('Whole Milk 1L', 20, 65.00, 'Pasteurized whole milk', 3),
    ('Chicken Breast', 15, 85.00, 'Fresh skinless chicken breast', 4),
    ('Orange Juice', 40, 45.00, '100% natural orange juice', 5)`
    );

  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

main();
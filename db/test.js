require("dotenv").config();

const pool = require("./pool");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

testConnection();
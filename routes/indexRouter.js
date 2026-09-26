// routes/indexRouter.js
const { Router } = require("express");
const db = require("../db/queries");

const {
  getAllCategories,
  getAllItems
} = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    const items = await getAllItems();

    res.render("index", {
      categories,
      items
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

module.exports = indexRouter;
// routes/indexRouter.js

const { Router } = require("express");

const {
  getAllCategories,
  getAllItemsWithCategories,
  getCategory,
  getItemsByCategory,
  getItem,
  insertCategory,
  insertItem,
} = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    const items = await getAllItemsWithCategories();

    res.render("index", {
      categories,
      items
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

indexRouter.post("/categories/new", async (req, res) => {
  try {
  const name = req.body.name;

  await insertCategory(name);

  res.redirect("/");
} catch (error) {
  console.error(error);
  res.status(500).send("Something went wrong.");
}
});

indexRouter.get("/categories/new", (req, res) => {
  res.render("categoryForm");
});

indexRouter.get("/categories/:id", async (req, res) => {
  // your code
  try {
    const category = await getCategory(req.params.id);
    const items = await getItemsByCategory(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("category", {
      category,
      items
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

indexRouter.get("/items/new", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("itemForm", {
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

indexRouter.post("/items/new", async (req, res) => {
  try {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const description = req.body.description;
    const categoryId = req.body.categoryId;

    await insertItem(name, quantity, price, description, categoryId);

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong")
  }
});

indexRouter.get("/items/:id", async (req, res) => {
  // your code
  try {
    const item = await getItem(req.params.id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("item", {
      item
    })

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});

indexRouter.get("/categories/:id/edit", async (req, res) => {

    try {
      const id = req.params.id;

      const category = await getCategory(id);

      if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categoryEditForm", { category });

    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
});

indexRouter.post("/categories/:id/edit", async (req, res) => {
  try {
    // 1. get id
    const id = req.params.id;

    const name = req.body.name;

    await updateCategory(id, name)

    res.redirect("/");
    // 4. redirect somewhere
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

module.exports = indexRouter;
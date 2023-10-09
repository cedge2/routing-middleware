const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

router.get("/", function (req, res) {
  return res.json(items);
});

router.post("/", function (req, res) {
  const newItem = req.body;
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

router.get("/:name", function (req, res) {
  const itemName = req.params.name;
  const item = items.find((i) => i.name === itemName);
  if (!item) throw new ExpressError("Item not found", 404);
  return res.json(item);
});

router.patch("/:name", function (req, res) {
  const itemName = req.params.name;
  const itemIndex = items.findIndex((i) => i.name === itemName);
  if (itemIndex === -1) throw new ExpressError("Item not found", 404);

  const updatedItem = req.body;
  items[itemIndex] = { ...items[itemIndex], ...updatedItem };
  return res.json({ updated: items[itemIndex] });
});

router.delete("/:name", function (req, res) {
  const itemName = req.params.name;
  const itemIndex = items.findIndex((i) => i.name === itemName);
  if (itemIndex === -1) throw new ExpressError("Item not found", 404);

  items.splice(itemIndex, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;

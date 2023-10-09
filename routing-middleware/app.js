const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app.use(express.json());

app.use("/items", itemsRoutes);

app.use((req, res, next) => {
  next(new ExpressError("Not Found", 404));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(status).json({ error: errorMessage });
});

module.exports = app;

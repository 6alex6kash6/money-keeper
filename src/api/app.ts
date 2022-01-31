import express from "express";
require("./db/index");

const PORT = 2727;
const app = express();

app.listen(PORT, () => {
  console.log(`Example app listening on port port ${PORT}`);
});

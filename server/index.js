import express from "express";

const app = express(); // create express app

app.listen(3000, () => {
  console.log("server started on port 3000!");
});

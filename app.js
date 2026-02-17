import express from "express";

export const app = express();

app.get("/", (req, res) => {
  console.log("Welcome to my app");
});

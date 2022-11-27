import express from "express";
import { contexts, DataRetriever } from "./dataRetriever.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Derde kamer data retriever");
});

app.get("/saveData/:context", (req, res) => {
  const requestedContext = req.params.context;
  if (!(requestedContext in contexts)) return;

  const dataRetriever = new DataRetriever();
  const context = contexts[requestedContext];
  dataRetriever.getDataRecursive(0, context);
  res.send(`Retrieving ${context.filename}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

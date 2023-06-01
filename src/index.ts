import express from "express";
import { contextIndex, contexts } from "./DataRetriever/contexts.js";
import { DataRetriever } from "./DataRetriever/dataRetriever.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Derde kamer data retriever....");
});

app.get("/saveData/:context", async (req, res) => {
  const requestedContext = req.params.context;

  if (!contexts.has(requestedContext)) {
    res.send(
      `Can't find context to save in ${JSON.stringify(contexts.keys())}`
    );
    return;
  }

  const dataRetriever = new DataRetriever();
  const context = contexts.get(requestedContext);
  await dataRetriever.getDataRecursive(0, context);

  res.send(`Retrieving ${context.filename}!`);
});

app.get("/retrieveAll", async (req, res) => {
  const dataRetriever = new DataRetriever();

  res.send(`Retrieving all data!`);
  for await (const context of contexts) {
    await dataRetriever.getDataRecursive(0, context[contextIndex]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

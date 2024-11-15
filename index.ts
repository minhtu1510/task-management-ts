import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: Number = 3000;
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import { Task } from "./models/task.model";

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
});

app.get("/tasks/detail/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });
  res.json(task);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

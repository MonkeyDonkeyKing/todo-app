import { Router } from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const todo = new Todo({ text: req.body.text, userId: req.user.userId });
  await todo.save();
  res.json(todo);
});

router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});

router.put("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Aktualisiert" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Gelöscht" });
});

export default router;

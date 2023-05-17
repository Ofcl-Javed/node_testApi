import express from "express";
import {
  newTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/all", isAuthenticated, getMyTasks);
router.post("/new", isAuthenticated, newTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;

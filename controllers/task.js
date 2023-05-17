import { Task } from "../models/task.js";
import { ErrorHandler, catchAsyncError } from "../utils/features.js";

export const newTask = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user: req.user });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
  });
});

export const getMyTasks = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const task = await Task.find({ user: userId });

  res.status(200).json({
    success: true,
    task,
  });
});

export const updateTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
  });
});

export const deleteTask = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  await task.deleteOne();
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

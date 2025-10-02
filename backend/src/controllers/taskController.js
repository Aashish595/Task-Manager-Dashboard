import Task from "../models/Task.js";
import { validateRequired } from "../utils/validateInput.js";

export const getTasks = async (req, res) => {
  try {
    const { status, priority, search } = req.query;

    let query = { user: req.userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    let tasks = await Task.find(query).sort({ createdAt: -1 });

    
    if (search) {
      const searchLower = search.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchLower) ||
          (task.description &&
            task.description.toLowerCase().includes(searchLower))
      );
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tasks"
    });
  }
};


export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, user: req.userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch task"
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const validation = validateRequired({ title });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const newTask = await Task.create({
      user: req.userId,
      title: title.trim(),
      description: description?.trim() || "",
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate || null
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create task"
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOne({ _id: id, user: req.userId });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update task"
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: req.userId });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete task"
    });
  }
};

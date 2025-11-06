import { Response, Request, NextFunction } from "express";
import Todo from "../models/todo";



interface AuthRequest extends Request {
  user?: any;
}

// ✅ CREATE TODO
export const createTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const todo = await Todo.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};

// ✅ GET TODOS (Admin → All / User → Own)
export const getTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let todos;

    if (req.user.role === "admin") {
      todos = await Todo.find()
        .populate("createdBy", "username email role")
        .sort({ createdAt: -1 });
    } else {
      todos = await Todo.find({ createdBy: req.user._id }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(todos);
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};

// ✅ UPDATE TODO
export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user._id },
      { new: true }
    );

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};

// ✅ DELETE TODO
export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    

    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};

// get one todo by id
export const getTodoById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (error: any) {
    console.error(error.message);
    next(error);
  }
};

// delete all todos user created


// ✅ DELETE ALL TODOS (only for logged-in user's own todos)
export const deleteAllTodos = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Delete all todos belonging to the logged-in user
    const delteAll = await Todo.deleteMany({ createdBy: req.user._id });
if (!delteAll) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({
      message: "All your todos have been deleted successfully",
      deletedCount: delteAll.deletedCount,
    });
  } catch (error: any) {
    console.error("Error deleting user todos:", error.message);
    next(error);
  }
};


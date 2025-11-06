import mongoose from "mongoose";
import {Document , Schema, model} from "mongoose";

interface ITodo extends Document {
    title: string;
    completed: boolean;
    status: "pending" | "in-progress" | "completed";
    createdBy: mongoose.Types.ObjectId;
}


const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ REQUIRED
  },
  { timestamps: true }
);


const Todo = model<ITodo>("Todo", todoSchema);
export default Todo;
import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model("Todo", TodoSchema);
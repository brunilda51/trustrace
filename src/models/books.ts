import mongoose from "mongoose";
import User from "./user";
const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    start_date: String,
    finish_date: String,
    rating: String,
    reader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);

import mongoose from "mongoose";
import User from "./user";

const MovieSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    watch_date: String,
    rating: String,
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);

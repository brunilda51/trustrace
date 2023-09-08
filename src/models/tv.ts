import mongoose from "mongoose";
import User from "./user";
const TvSchema = new mongoose.Schema(
  {
    title: String,
    start_date: String,
    finish_date: String,
    rating: String,
    viewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tv", TvSchema);

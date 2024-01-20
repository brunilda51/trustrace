// db.ts

import mongoose, { ConnectOptions } from "mongoose";

const dbUrl = "mongodb://13.39.23.2:27017/trustmen";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connectionss error:", error);
});

database.once("open", () => {
  console.log("Connected to MongoDB");
});

export default database;

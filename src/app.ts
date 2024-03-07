import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/users";
import bookRouter from "./routes/books";
import tvRouter from "./routes/tv";
import movieRouter from "./routes/movies";
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api/books", bookRouter);
app.use("/api/tv", tvRouter);
app.use("/api/movie", movieRouter);
app.use("/api/users", usersRouter);

try {
  mongoose.connect("mongodb://52.47.126.117:27017/trustmen");
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

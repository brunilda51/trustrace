import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usersRouter from "./routes/users";
import bookRouter from "./routes/books";
import tvRouter from "./routes/tv";
import movieRouter from "./routes/movies";
import { connectToDatabase } from "./db";
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Parent Router
const apiRouter = express.Router();

apiRouter.use("/books", bookRouter);
apiRouter.use("/tv", tvRouter);
apiRouter.use("/movie", movieRouter);
apiRouter.use("/users", usersRouter);

app.use("/api", apiRouter);

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });

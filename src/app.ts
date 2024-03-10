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
  let mongoHost;

  // Check if the application is running locally or on the server
  if (process.env.NODE_ENV === "production") {
    // If running on the server, use 'localhost'
    mongoHost = "localhost";
  } else {
    // If running locally, use the IP address '13.38.34.81'
    mongoHost = "13.38.34.81";
  }

  // Construct the MongoDB connection string
  const mongoURI = `mongodb://${mongoHost}:27018/trustmen`;
  mongoose.connect(mongoURI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import usersRouter from "./routes/users";
import bookRouter from "./routes/books";
import tvRouter from "./routes/tv";
import movieRouter from "./routes/movies";
import { connectToDatabase } from "./db";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import cors from "cors";
import authRouter from "./routes/auth";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // or specify the origins you want to allow
    methods: "GET,PUT,POST,DELETE", // include PUT method
    allowedHeaders: "Content-Type,Authorization", // include any custom headers your PUT request might include
  })
);

// Parent Router
const apiRouter = express.Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/books", bookRouter);
apiRouter.use("/tv", tvRouter);
apiRouter.use("/movie", movieRouter);
apiRouter.use("/users", usersRouter);

app.use("/", apiRouter);
const openapiSpecPath = path.resolve(__dirname, "./docs/openapi.yaml");
const swaggerDocument = YAML.load(openapiSpecPath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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

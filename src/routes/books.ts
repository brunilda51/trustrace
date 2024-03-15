import { Router } from "express";

import {
  getFilteredBooks,
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookStats,
} from "../controller/books";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", addBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/stats", getBookStats);
bookRouter.get("/filter/:page", getFilteredBooks);

export default bookRouter;

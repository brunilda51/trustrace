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
bookRouter.get("/stats", getBookStats);
bookRouter.get("/filter", getFilteredBooks);
bookRouter.put("/:id", updateBook);
bookRouter.post("/", addBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;

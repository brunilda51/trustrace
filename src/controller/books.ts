import { Request, Response, NextFunction } from "express";
import Book from "../models/books";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const books = await Book.find();
  res.status(200).json({ books });
};

export const getFilteredBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filterOption = req.query.reader
    ? { "readerObject.username": req.query.reader }
    : {};
  const page = Number(req.params.page); // Convert req.params.page to a number
  const skip = page * 10;
  const books = await Book.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "reader",
        foreignField: "_id",
        as: "readerObject",
      },
    },
    { $unwind: "$readerObject" },
    { $match: filterOption },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", { reader: "$readerObject" }],
        },
      },
    },
    {
      $project: {
        readerObject: 0, // Exclude the 'readerObject' field
      },
    },
    {
      $sort: { start_date: 1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: 10,
    },
  ]);

  res.status(200).json({ books });
};

export const getBookStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stats = await Book.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "reader",
        foreignField: "_id",
        as: "readerObject",
      },
    },
    { $unwind: "$readerObject" },
    {
      $group: {
        _id: "$readerObject._id",
        reader: { $first: "$readerObject" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.status(200).json(stats);
};

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const book = await Book.create({
    title: body.title,
    author: body.author,
    start_date: body.start_date,
    finish_date: body.finish_date,
    rating: body.rating,
    reader: body.reader,
  });

  res.status(200).json({ book });
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: body.title,
        author: body.author,
        start_date: body.start_date,
        finish_date: body.finish_date,
        rating: body.rating,
        reader: body.reader,
      },
      { new: true }
    );
    res.status(200).json({ book });
  } catch (err) {
    res.send(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ book });
  } catch (err) {
    res.send(err);
  }
};

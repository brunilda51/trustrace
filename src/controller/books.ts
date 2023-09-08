import Book from "../models/books";

export const getAllBooks = async (req, res, next) => {
  const books = await Book.find({});
  res.status(200).json({ books });
};

export const getFilteredBooks = async (req, res, next) => {
  let filterOption = req.query.reader
    ? { "readerObject.username": req.query.reader }
    : {};
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
          $mergeObjects: [
            "$$ROOT", // Preserve existing fields from the 'books' collection
            { reader: "$readerObject" }, // Add the 'reader' field from 'readerObject'
          ],
        },
      },
    },
    {
      $project: {
        readerObject: 0, // Exclude the 'readerObject' field
      },
    },
  ]);
  res.status(200).json({ books });
};

export const getBookStats = async (req, res, next) => {
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
        _id: "$readerObject._id", // Group by the unique reader ID
        reader: { $first: "$readerObject" }, // Preserve the reader information
        count: { $sum: 1 }, // Count the documents for each reader
      },
    },
    {
      $project: {
        _id: 0, // Exclude the group _id
      },
    },
  ]);

  res.status(200).json(stats);
};

export const addBook = async (req, res, next) => {
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

export const updateBook = async (req, res, next) => {
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
      }
    );
    res.status(200).json({ book });
  } catch (err) {
    res.send(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ book });
  } catch (err) {
    res.send(err);
  }
};

import Movie from "../models/movies";

export const getAllMovies = async (req, res, next) => {
  const movies = await Movie.find({});
  res.status(200).json({ movies });
};

export const getFilteredMovies = async (req, res, next) => {
  let filterOption = req.query.viewer
    ? { "viewerObject.username": req.query.viewer }
    : {};
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "viewer",
        foreignField: "_id",
        as: "viewerObject",
      },
    },
    { $unwind: "$viewerObject" },
    { $match: filterOption },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            "$$ROOT", // Preserve existing fields from the 'movies' collection
            { viewer: "$viewerObject" }, // Add the 'viewer' field from 'viewerObject'
          ],
        },
      },
    },
    {
      $project: {
        viewerObject: 0, // Exclude the 'viewerObject' field
      },
    },
  ]);
  res.status(200).json({ movies });
};

export const getMovieStats = async (req, res, next) => {
  const stats = await Movie.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "viewer",
        foreignField: "_id",
        as: "viewerObject",
      },
    },
    { $unwind: "$viewerObject" },
    {
      $group: {
        _id: "$viewerObject._id", // Group by the unique viewer ID
        viewer: { $first: "$viewerObject" }, // Preserve the viewer information
        count: { $sum: 1 }, // Count the documents for each viewer
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

export const addMovie = async (req, res, next) => {
  const body = req.body;
  const movie = await Movie.create({
    title: body.title,
    watch_date: body.watch_date,
    rating: body.rating,
    viewer: body.viewer,
  });

  res.status(200).json({ movie });
};

export const updateMovie = async (req, res, next) => {
  const body = req.body;
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: body.title,
        watch_date: body.start_date,
        rating: body.rating,
        viewer: body.viewer,
      }
    );
    res.status(200).json({ movie });
  } catch (err) {
    res.send(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ movie });
  } catch (err) {
    res.send(err);
  }
};

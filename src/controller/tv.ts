import Tv from "../models/tv";

export const getAllTvShows = async (req, res, next) => {
  const tvs = await Tv.find({});
  res.status(200).json({ tvs });
};

export const getFilteredTvShows = async (req, res, next) => {
  let filterOption = req.query.viewer
    ? { "viewerObject.username": req.query.viewer }
    : {};
  const tvs = await Tv.aggregate([
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
            "$$ROOT", // Preserve existing fields from the 'tvs' collection
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
  res.status(200).json({ tvs });
};

export const getTvStats = async (req, res, next) => {
  const stats = await Tv.aggregate([
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

export const addTvShow = async (req, res, next) => {
  const body = req.body;
  const tv = await Tv.create({
    title: body.title,
    start_date: body.start_date,
    finish_date: body.finish_date,
    rating: body.rating,
    viewer: body.viewer,
  });

  res.status(200).json({ tv });
};

export const updateTvShow = async (req, res, next) => {
  const body = req.body;
  try {
    const tv = await Tv.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: body.title,
        start_date: body.start_date,
        finish_date: body.finish_date,
        rating: body.rating,
        viewer: body.viewer,
      }
    );
    res.status(200).json({ tv });
  } catch (err) {
    res.send(err);
  }
};

export const deleteTvShow = async (req, res, next) => {
  try {
    const tv = await Tv.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ tv });
  } catch (err) {
    res.send(err);
  }
};

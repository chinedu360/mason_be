const Videos = require("../../models/video/video");

async function createVideo(req, res, next) {
  try {
    const { title, youtube_link } = req.body;

    // const content_image = req.files[0] ? req.files[0].location : null;
    // const display_image = req.files[1] ? req.files[1].location : null;
    // const featured_image_url = req.files[2] ? req.files[2].location : null;

    if (!title || !youtube_link) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const blogpost = new Videos(title, youtube_link);
    await blogpost.save();

    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateVideo(req, res, next) {
  try {
    const { title } = req.body;

    console.log(req.body);

    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Missing required video id" });
    }

    const video = new Videos(title);

    const resp = await video.updateVideo(id);

    if (resp === null) {
      return res.status(404).json({
        message:
          "Video with the provided ID does not exist so you cannot update the title",
      });
    }

    return res
      .status(201)
      .json({ message: "Video updated successfully", response: resp });
  } catch (error) {
    console.error("Error updating video title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findAllVideo(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; // Parse from query string
    const limit = parseInt(req.query.limit) || 11; // Parse from query string

    const videos = await Videos.findAllVideos(page, limit);

    return res.status(200).json({
      message: "Videos found",
      length: videos.length,
      currentPage: page,
      itemsPerPage: limit,
      data: videos,
    });
  } catch (error) {
    console.error("Error getting video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteVideo(req, res) {
  try {
    const id = req.params.id;
    console.log({ id });
    if (!id) {
      return res.status(400).json({ message: "No Id" });
    }

    const resp = await Videos.deleteVideoById(id);

    if (!resp.success) {
      return res.status(400).json({ message: resp.message }); // Return a 400 status with the error message
    }

    return res.status(200).json({ message: resp.message });
  } catch (error) {
    console.error("Error deleting video by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createVideo,
  updateVideo,
  findAllVideo,
  deleteVideo,
};

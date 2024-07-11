const AboutPost = require("../../models/about.js/about");

async function createOrUpdateAboutPost(req, res, next) {
  try {
    const { content } = req.body;
    const content_image = req.files[0] ? req.files[0].location : null;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await AboutPost.exists();

    if (exists) {
      await AboutPost.update(content, content_image);
      return res
        .status(200)
        .json({ message: "About post updated successfully" });
    } else {
      const aboutpost = new AboutPost(content, content_image);
      await aboutpost.save();
      return res
        .status(201)
        .json({ message: "About post created successfully" });
    }
  } catch (error) {
    console.error("Error creating or updating about post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findAboutPost(req, res, next) {
  try {
    const about = await AboutPost.findAboutPost();

    console.log(about);
    return res.status(200).json({
      message: "About found",
      length: about.length,
      data: about,
    });
  } catch (error) {
    console.error("Error getting blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createOrUpdateAboutPost,
  findAboutPost,
};

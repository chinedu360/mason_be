// const Article = require("../../models/article/article");
const aws = require("aws-sdk");
const Article = require("../../models/article/article");
// const { awsparams } = require("../../helpers/params");

// Function to create a new topic
async function createTopic(req, res, next) {
  try {
    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Error: No files uploaded" });
    }

    // Check if required fields are present in the request
    if (!req.files[0].location || !req.files[0].key || !req.body.name) {
      return res
        .status(400)
        .json({ message: "Error: Missing required fields" });
    }

    // Extract necessary data from the request
    const url = req.files[0].location;
    const img_key = req.files[0].key;
    const name = req.body.name;

    // Create a new Article instance
    const article = new Article(name, url, img_key);

    // Save the article topic
    await article.save();

    // Return success response

    console.log({ article });
    res
      .status(201)
      .json({ message: "Article topic saved successfully", article });
  } catch (error) {
    console.error("Error creating article topic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getArticle(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // Parse from query string
    const limit = parseInt(req.query.limit) || 3; // Parse from query string

    const articles = await Article.findAllArticles(
      //   topic_id,
      page,
      limit
    );

    return res.status(200).json({
      message: "Article post found",
      length: articles.length,
      currentPage: page,
      itemsPerPage: limit,
      data: articles,
    });
  } catch (error) {
    console.error("Error getting article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateArticleTopic(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let url, img_key;

    if (
      req.files &&
      req.files.length > 0 &&
      req.files[0].location &&
      req.files[0].key
    ) {
      url = req.files[0].location;
      img_key = req.files[0].key;
    }

    const updateResp = new Article(name, url, img_key);
    const affectedRows = await updateResp.update(id);

    if (affectedRows === null) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic updated", updateResp });
  } catch (error) {
    console.error("Error updating article topic:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteArticleTopic(req, res, next) {
  try {
    const { id } = req.params;
    const { img_key } = req.body;

    console.log(img_key, id, req.params.id);

    const s3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_BUCKET_REGION,
    });

    const params = {
      Bucket: "imasons-uploads",
      Key: img_key,
    };

    // Delete object from S3
    await s3.deleteObject(params).promise();

    // Delete corresponding entry from database
    const resp = await Article.deleteTopic(id);

    return res.status(200).json({ message: resp });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = {
  createTopic,
  deleteArticleTopic,
  updateArticleTopic,
  getArticle,
};

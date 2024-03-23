const BlogPost = require("../../models/blog/blog");

async function createBlogPost(req, res, next) {
  try {
    const { title, content, author_id } = req.body;

    const content_image = req.files[0] ? req.files[0].location : null;
    const display_image = req.files[1] ? req.files[1].location : null;
    const featured_image_url = req.files[2] ? req.files[2].location : null;

    if (!title || !content || !author_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const blogpost = new BlogPost(
      title,
      content,
      content_image,
      display_image,
      featured_image_url,
      author_id
    );
    await blogpost.save();

    res.status(201).json({ message: "OK" });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateBlogPost(req, res, next) {
  try {
    const { title, content } = req.body;

    const content_image = req.files[0] ? req.files[0].location : null;
    const display_image = req.files[1] ? req.files[1].location : null;
    const featured_image_url = req.files[2] ? req.files[2].location : null;

    console.log(req.body);

    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Missing required post id" });
    }

    const blogPost = new BlogPost(
      title,
      content,
      content_image,
      display_image,
      featured_image_url
    );

    const resp = await blogPost.update(id);

    if (resp === null) {
      return res.status(404).json({
        message:
          "Blog post with the provided ID does not exist so you cannot update",
      });
    }

    return res
      .status(201)
      .json({ message: "Blog post updated successfully", response: resp });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findAllBlogPosts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1; // Parse from query string
    const limit = parseInt(req.query.limit) || 4; // Parse from query string

    const articles = await BlogPost.findAllBlogPost(page, limit);

    return res.status(200).json({
      message: "Blog post found",
      length: articles.length,
      currentPage: page,
      itemsPerPage: limit,
      data: articles,
    });
  } catch (error) {
    console.error("Error getting blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function findByBlogPostByAuthorId(req, res, next) {
  try {
    const author_id = req.params.author_id;

    const page = parseInt(req.query.page) || 1; // Parse from query string
    const limit = parseInt(req.query.limit) || 10; // Parse from query string

    console.log(author_id, page, limit, req.params);

    if (!author_id) {
      return res.status(400).json({ message: "No Author Id" });
    }

    const articles = await BlogPost.findByBlogPostByAuthorId(
      author_id,
      page,
      limit
    );

    return res.status(200).json({
      message: "Blog post found",
      length: articles.length,
      currentPage: page,
      itemsPerPage: limit,
      data: articles,
    });
  } catch (error) {
    console.error("Error getting blog post by author id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteBlogPost(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "No Id" });
    }

    const resp = await BlogPost.deleteByBlogPostId(id);

    return res.status(200).json({ resp });
  } catch (error) {
    console.error("Error deleting blog post by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  createBlogPost,
  updateBlogPost,
  findAllBlogPosts,
  findByBlogPostByAuthorId,
  deleteBlogPost,
};

const Subtopic = require("../../models/subtopics/subtopics");

async function createSubtopic(req, res, next) {
  try {
    const { title, content, topic_id } = req.body;
    // Check if required fields are present in the request
    if (!title || !content || !topic_id) {
      return res
        .status(400)
        .json({ message: "Error: Missing required fields" });
    }

    // Create a new subtopic instance
    const subtopicsres = new Subtopic(title, content, topic_id);

    // Save the subtopic topic
    const subtopics = await subtopicsres.save();

    console.log({ subtopics });
    // Return success response
    res
      .status(201)
      .json({ message: "Subtopic topic saved successfully", subtopics });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function getSubtopics(req, res) {
  try {
    const { topic_id } = req.params;
    const page = parseInt(req.query.page) || 1; // Parse from query string
    const limit = parseInt(req.query.limit) || 5; // Parse from query string

    const subtopics = await Subtopic.findAllSubtopics(topic_id, page, limit);

    return res.status(200).json({
      message: "subtopic found",
      length: subtopics.length,
      currentPage: page,
      itemsPerPage: limit,
      data: subtopics,
    });
  } catch (error) {
    console.error("Error getting subtopic:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function updateSubtopic(req, res, next) {
  try {
    const { subtopic_id } = req.params;
    const { title, content, topic_id } = req.body;

    console.log({ title, content, topic_id, subtopic_id });

    // Check if required fields are present in the request
    if (!title || !content || !topic_id || !subtopic_id) {
      return res
        .status(400)
        .json({ message: "Error: Missing required fields" });
    }

    // Update the subtopic
    const resp = await Subtopic.update(subtopic_id, title, content, topic_id);

    // Return success response
    res.status(200).json({ message: resp });
  } catch (error) {
    console.error("Error updating subtopic:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

async function deleteSubtopic(req, res, next) {
  try {
    const subtopic_id = req.params.subtopic_id; // Ensure that 'subtopic_id' matches the parameter name in your route configuration

    console.log({ subtopic_id });

    // Delete corresponding entry from database
    const resp = await Subtopic.deleteSubtopic(subtopic_id);

    return res.status(200).json({ message: resp });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createSubtopic,
  getSubtopics,
  updateSubtopic,
  deleteSubtopic,
};

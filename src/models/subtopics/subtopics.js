const db = require("../../services/mysql");

module.exports = class SubTopics {
  constructor(title, content, topic_id) {
    this.title = title;
    this.content = content;
    this.topic_id = topic_id;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO Subtopics (title, content, topic_id) VALUES (?, ?, ?)",
        [this.title, this.content, this.topic_id]
      );

      return result[0].insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAllSubtopics(topic_id, page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql = "SELECT * FROM Subtopics WHERE topic_id = ? LIMIT ? OFFSET ?";
      const [rows, fields] = await db.execute(sql, [
        topic_id,
        String(limit),
        String(offset),
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(subtopic_id, title, content, topic_id) {
    try {
      const checkSql = "SELECT * FROM Subtopics WHERE subtopic_id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [
        subtopic_id,
      ]);

      if (checkRows.length === 0) {
        return "No Subtopic with Id"; // Return a message indicating the subtopic does not exist
      }

      let sql = "UPDATE Subtopics SET";
      const updateValues = [];

      if (title !== undefined) {
        sql += " title = ?,";
        updateValues.push(title);
      }
      if (content !== undefined) {
        sql += " content = ?,";
        updateValues.push(content);
      }

      // Remove the trailing comma if any
      sql = sql.replace(/,$/, "");

      // Add the WHERE clause
      sql += " WHERE subtopic_id = ? AND topic_id = ?";
      updateValues.push(subtopic_id);
      updateValues.push(topic_id);

      const result = await db.execute(sql, updateValues);

      return result[0].affectedRows; // Return the number of affected rows after update
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubtopic(subtopic_id) {
    try {
      const checkSql = "SELECT * FROM Subtopics WHERE subtopic_id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [
        subtopic_id,
      ]);
      console.log(checkRows);
      if (checkRows.length === 0) {
        return "Subtopic with the provided ID does not exist"; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM Subtopics WHERE subtopic_id = ?";
      const [rows, fields] = await db.execute(deleteSql, [subtopic_id]);

      return "Subtopics deleted successfully"; // Return a success message
    } catch (error) {
      throw error;
    }
  }
};

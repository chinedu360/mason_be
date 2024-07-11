const db = require("../../services/mysql");

module.exports = class Videos {
  constructor(title, youtube_link) {
    this.title = title;
    this.youtube_link = youtube_link;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO Videos (title, youtube_link) VALUES (?, ?)",
        [this.title, this.youtube_link]
      );
      const insertId = result[0].insertId;
      return insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAllVideos(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql = "SELECT * FROM Videos LIMIT ? OFFSET ?";
      const [rows, fields] = await db.execute(sql, [
        String(limit),
        String(offset),
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async updateVideo(id) {
    try {
      const checkSql = "SELECT * FROM Videos WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [id]);

      if (checkRows.length === 0) {
        return null; // Return a message indicating the blog post does not exist
      }

      let sql = "UPDATE Videos SET";
      const updateValues = [];

      if (this.title !== undefined) {
        sql += " title = ?,";
        updateValues.push(this.title);
      }

      // Remove the trailing comma if any
      sql = sql.replace(/,$/, "");

      // Add the WHERE clause
      sql += " WHERE id = ?";
      updateValues.push(id);

      const result = await db.execute(sql, updateValues);

      return result[0].affectedRows; // Return the number of affected rows after update
    } catch (error) {
      throw error;
    }
  }

  static async deleteVideoById(Id) {
    try {
      const checkSql = "SELECT * FROM Videos WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [Id]);

      if (checkRows.length === 0) {
        return {
          success: false,
          message: "Video with the provided ID does not exist",
        }; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM Videos WHERE id = ?";
      const [rows, fields] = await db.execute(deleteSql, [Id]);

      return { success: true, message: "Videos deleted successfully" }; // Return a success message
    } catch (error) {
      throw error;
    }
  }
};

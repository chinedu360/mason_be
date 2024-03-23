const db = require("../../services/mysql");

module.exports = class Article {
  constructor(name, background_image, img_key) {
    this.name = name;
    this.background_image = background_image;
    this.img_key = img_key;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO Topics (name, background_image, img_key) VALUES (?, ?, ?)",
        [this.name, this.background_image, this.img_key]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findAllArticles(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql = "SELECT * FROM Topics LIMIT ? OFFSET ?";
      const [rows, fields] = await db.execute(sql, [
        String(limit),
        String(offset),
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async update(id) {
    try {
      const checkSql = "SELECT * FROM Topics WHERE topic_id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [id]);

      if (checkRows.length === 0) {
        return null; // Return a message indicating the topic does not exist
      }

      let sql = "UPDATE Topics SET";
      const updateValues = [];

      if (this.name !== undefined) {
        sql += " name = ?,";
        updateValues.push(this.name);
      }
      if (this.background_image !== undefined) {
        sql += " background_image = ?,";
        updateValues.push(this.background_image);
      }
      if (this.img_key !== undefined) {
        sql += " img_key = ?,";
        updateValues.push(this.img_key);
      }

      // Remove the trailing comma if any
      sql = sql.replace(/,$/, "");

      // Add the WHERE clause
      sql += " WHERE topic_id = ?";
      updateValues.push(id);

      const result = await db.execute(sql, updateValues);

      return result[0].affectedRows; // Return the number of affected rows after update
    } catch (error) {
      throw error;
    }
  }

  static async deleteTopic(Id) {
    try {
      const checkSql = "SELECT * FROM Topics WHERE topic_id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [Id]);
      console.log(checkRows);
      if (checkRows.length === 0) {
        return "Topic with the provided ID does not exist"; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM Topics WHERE topic_id = ?";
      const [rows, fields] = await db.execute(deleteSql, [Id]);

      return "Topic image deleted successfully"; // Return a success message
    } catch (error) {
      throw error;
    }
  }
};

const db = require("../../services/mysql");

module.exports = class AboutPost {
  constructor(content, content_image) {
    this.content = content;
    this.content_image = content_image;
  }

  static async exists() {
    try {
      const [rows] = await db.execute(
        "SELECT COUNT(*) as count FROM AboutPost"
      );
      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

  static async update(content, content_image) {
    try {
      await db.execute(
        "UPDATE AboutPost SET content = ?, content_image = ? WHERE id = 1",
        [content, content_image]
      );
    } catch (error) {
      throw error;
    }
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO AboutPost (content, content_image) VALUES (?, ?)",
        [this.content, this.content_image]
      );
      const insertId = result[0].insertId;
      return insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAboutPost() {
    try {
      //   const offset = (page - 1) * limit;
      const sql = "SELECT * FROM AboutPost";
      const [rows, fields] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

const db = require("../../services/mysql");

module.exports = class BlogPost {
  constructor(
    title,
    content,
    content_image,
    display_image,
    featured_image_url,
    author_id
  ) {
    this.title = title;
    this.content = content;
    this.content_image = content_image;
    this.display_image = display_image;
    this.featured_image_url = featured_image_url;
    this.author_id = author_id;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO BlogPost (title, content, content_image, display_image, featured_image_url, author_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.title,
          this.content,
          this.content_image,
          this.display_image,
          this.featured_image_url,
          this.author_id,
        ]
      );
      const insertId = result[0].insertId;
      return insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAllBlogPost(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql = "SELECT * FROM BlogPost LIMIT ? OFFSET ?";
      const [rows, fields] = await db.execute(sql, [
        String(limit),
        String(offset),
      ]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByBlogPostByAuthorId(authorId, page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql =
        "SELECT * FROM BlogPost WHERE author_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?";
      const [rows, fields] = await db.execute(sql, [
        String(authorId),
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
      const checkSql = "SELECT * FROM BlogPost WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [id]);

      if (checkRows.length === 0) {
        return null; // Return a message indicating the blog post does not exist
      }

      let sql = "UPDATE BlogPost SET";
      const updateValues = [];

      if (this.title !== undefined) {
        sql += " title = ?,";
        updateValues.push(this.title);
      }
      if (this.content !== undefined) {
        sql += " content = ?,";
        updateValues.push(this.content);
      }
      if (this.content_image !== undefined) {
        sql += " content_image = ?,";
        updateValues.push(this.content_image);
      }
      if (this.display_image !== undefined) {
        sql += " display_image = ?,";
        updateValues.push(this.display_image);
      }
      if (this.featured_image_url !== undefined) {
        sql += " featured_image_url = ?,";
        updateValues.push(this.featured_image_url);
      }
      if (this.author_id !== undefined) {
        sql += " author_id = ?,";
        updateValues.push(this.author_id);
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

  static async deleteByBlogPostId(Id) {
    try {
      const checkSql = "SELECT * FROM BlogPost WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [Id]);

      if (checkRows.length === 0) {
        return {
          success: false,
          message: "Blog post with the provided ID does not exist",
        }; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM BlogPost WHERE id = ?";
      const [rows, fields] = await db.execute(deleteSql, [Id]);

      return { success: true, message: "Blog post deleted successfully" }; // Return a success message
    } catch (error) {
      throw error;
    }
  }
};

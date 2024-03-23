const db = require("../../services/mysql");

module.exports = class Officer {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  static async getOfficer(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql =
        "SELECT * FROM users WHERE level IS NOT NULL ORDER BY id DESC  LIMIT ? OFFSET ?";
      const result = await db.execute(sql, [String(limit), String(offset)]);

      return result[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id) {
    try {
      const checkSql = "SELECT * FROM users WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [id]);

      if (checkRows.length === 0) {
        return null; // Return a message indicating the topic does not exist
      }

      console.log({ id }, this.name, this.level);

      let sql = "UPDATE users SET";
      const updateValues = [];

      if (this.name !== undefined) {
        sql += " name = ?,";
        updateValues.push(this.name);
      }
      if (this.level !== undefined) {
        sql += " level = ?,";
        updateValues.push(this.level);
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

  static async deleteOfficer(Id) {
    try {
      const checkSql = "SELECT * FROM users WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [Id]);
      console.log(checkRows);
      if (checkRows.length === 0) {
        return "No User with provided ID"; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "UPDATE users SET level = NULL WHERE id = ?";

      const [rows, fields] = await db.execute(deleteSql, [Id]);

      return "Officer role deleted deleted successfully"; // Return a success message
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};

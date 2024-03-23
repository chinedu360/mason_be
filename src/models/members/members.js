const db = require("../../services/mysql");

module.exports = class Members {
  constructor(
    name,
    level,
    officerTitle, // Add officerTitle as a parameter
    phoneNumber,
    workPhone, // Add workPhone as a parameter
    email,
    address
    // profilePicture = "default.png"
  ) {
    this.name = name;
    this.level = level;
    this.officerTitle = officerTitle; // Assign officerTitle property
    this.phoneNumber = phoneNumber;
    this.workPhone = workPhone; // Assign workPhone property
    this.email = email;
    this.address = address;
    // this.profilePicture = profilePicture || "default.png";
  }
  static async getMembers(page, limit) {
    try {
      const offset = (page - 1) * limit;
      const sql =
        "SELECT * FROM users WHERE level IS NULL ORDER BY id DESC  LIMIT ? OFFSET ?";
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
      if (this.officerTitle !== undefined) {
        sql += " officerTitle = ?,";
        updateValues.push(this.officerTitle);
      }
      if (this.phoneNumber !== undefined) {
        sql += " phoneNumber = ?,";
        updateValues.push(this.phoneNumber);
      }
      if (this.workPhone !== undefined) {
        sql += " workPhone = ?,";
        updateValues.push(this.workPhone);
      }
      if (this.email !== undefined) {
        sql += " email = ?,";
        updateValues.push(this.email);
      }
      if (this.address !== undefined) {
        sql += " address = ?,";
        updateValues.push(this.address);
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

  static async deleteMember(id) {
    try {
      const checkSql = "SELECT * FROM users WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [id]);
      // console.log(checkRows);
      if (checkRows.length === 0) {
        return "No User with provided id"; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM users WHERE id = ?";

      const [rows, fields] = await db.execute(deleteSql, [id]);

      return "Officer role deleted deleted successfully"; // Return a success message
    } catch (error) {
      throw error;
    }
  }

  static async searchMember(searchValue) {
    const searchsql = `SELECT * FROM users WHERE name LIKE ? OR phoneNumber LIKE ? OR email LIKE ? OR level LIKE ?`;

    const searchterm = `%${searchValue}%`;

    const result = await db.execute(searchsql, [
      searchterm,
      searchterm,
      searchterm,
      searchterm,
    ]);
    return result[0];
  }
};

const db = require("../../services/mysql");

module.exports = class Calender {
  constructor(user_id, public_link, brother_link, officer_link) {
    this.user_id = user_id;
    this.public_link = public_link;
    this.brother_link = brother_link;
    this.officer_link = officer_link;
  }

  async save() {
    try {
      // Check if the table is empty
      const countQuery = "SELECT COUNT(*) AS count FROM calendarLinks";
      const [countResult] = await db.query(countQuery);
      const count = countResult[0].count;

      if (count === 0) {
        const result = await db.execute(
          "INSERT INTO calendarLinks (user_id, public_link, brother_link, officer_link, isNotEmpty) VALUES (?, ?, ?, ?, TRUE)",
          [this.user_id, this.public_link, this.brother_link, this.officer_link]
        );
        return result;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async findCalnderLinks() {
    try {
      const sql = "SELECT * FROM calendarLinks";
      const [rows, field] = await db.execute(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async update() {
    try {
      let sql = "UPDATE calendarLinks SET";
      const updateValues = [];

      if (this.user_id !== undefined) {
        sql += " user_id = ?,";
        updateValues.push(this.user_id);
      }
      if (this.public_link !== undefined) {
        sql += " public_link = ?,";
        updateValues.push(this.public_link);
      }
      if (this.brother_link !== undefined) {
        sql += " brother_link = ?,";
        updateValues.push(this.brother_link);
      }
      if (this.officer_link !== undefined) {
        sql += " officer_link = ?,";
        updateValues.push(this.officer_link);
      }

      // Remove the trailing comma if any
      sql = sql.replace(/,$/, "");

      const result = await db.execute(sql, updateValues);

      return result[0].affectedRows; // Return the number of affected rows after update
    } catch (error) {
      throw error;
    }
  }
};

const db = require("../../services/mysql");

module.exports = class Lodgedetails {
  constructor(bgcolor, lodgenumber, lodgelogo, brotheronlybgimage) {
    this.bgcolor = bgcolor || null;
    this.lodgenumber = lodgenumber || null;
    this.lodgelogo = lodgelogo || null;
    this.brotheronlybgimage = brotheronlybgimage || null;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO lodgeinfo (bgcolor, lodgenumber, lodgelogo, brotheronlybgimage ) VALUES (?, ?, ?, ?)",
        [
          this.bgcolor,
          this.lodgenumber,
          this.lodgelogo,
          this.brotheronlybgimage,
        ]
      );
      const insertId = result[0].insertId;

      return insertId;
    } catch (error) {
      throw error;
    }
  }

  static findByEmail(email) {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
  }

  static async isValidPassword(enteredPassword, storedPassword) {
    try {
      const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
      return isMatch;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async createPasswordResetToken(email) {
    console.log({ email });
    try {
      const resetToken = crypto.randomBytes(32).toString("hex");

      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      console.log({ resetToken, hashedToken });

      const resetExpires = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes

      await db.execute(
        "UPDATE users SET passwordResetToken = ?, passwordResetExpires = ? WHERE email = ?",
        [hashedToken, resetExpires, email]
      );

      return hashedToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async resetPassword(passwordResetToken) {
    try {
      await db.execute(
        "SELECT * FROM users WHERE passwordResetToken = ? AND passwordResetExpires > NOW()",
        [passwordResetToken]
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updatePassword() {
    try {
      await db.execute(
        "UPDATE users SET password = 'new_password', passwordResetToken = NULL, passwordResetExpires = NULL WHERE id = user_id"
      );
    } catch (error) {
      throw new Error(error);
    }
  }
};

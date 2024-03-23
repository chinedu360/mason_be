const db = require("../../services/mysql");

module.exports = class SliderImg {
  constructor(url, img_key) {
    this.url = url;
    this.img_key = img_key;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO SliderImgURLs (url, img_key) VALUES (?, ?)",
        [this.url, this.img_key]
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSliderImgById(Id) {
    try {
      const checkSql = "SELECT * FROM SliderImgURLs WHERE id = ?";
      const [checkRows, checkFields] = await db.execute(checkSql, [Id]);

      if (checkRows.length === 0) {
        return "Image with the provided ID does not exist"; // Return a message indicating the blog post does not exist
      }

      const deleteSql = "DELETE FROM SliderImgURLs WHERE id = ?";
      const [rows, fields] = await db.execute(deleteSql, [Id]);

      return "slider image deleted successfully"; // Return a success message
    } catch (error) {
      throw error;
    }
  }
};

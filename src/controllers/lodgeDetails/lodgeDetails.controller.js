const Lodgedetails = require("../../models/lodgedetails/lodgedetails");
const uploadToS3 = require("../../services/s3Upload");

async function lodgedetailController(req, res, next) {
  try {
    // Check if text data and files are present in the request
    if (!req.body || !req.body || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    console.log(req.files[0], req.files[1]);

    const bgcolor = req.body.bgcolor;
    const lodgenumber = req.body.lodgenumber;
    const lodgelogo = req.files[0].location;
    const brotheronlybgimage = req.files[1].location;
    // Create a new instance of Lodgedetails model
    const lodgeinfo = new Lodgedetails(
      bgcolor,
      lodgenumber,
      lodgelogo,
      brotheronlybgimage
    );

    // Save the lodge information to the database
    await lodgeinfo.save();

    res.status(200).json({ message: "Data saved successfully", lodgeinfo });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { lodgedetailController };

const Lodgedetails = require("../../models/lodgedetails/lodgedetails");
const multer = require("multer");

// Set up multer for parsing form data
const upload = multer();

async function lodgedetailController(req, res, next) {
  console.log("hiiii", req.files);
  try {
    console.log(req.headers);
    upload.any()(req, res, async (err) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(400).json({ message: "Error parsing form data" });
      }

      // Access form data fields
      const { bgcolor, lodgenumber } = req.body;

      // Access files uploaded via any field
      const files = req.files;

      // Log form data fields and file details
      console.log("Received Form Data:", bgcolor, lodgenumber);
      console.log("Uploaded Files:", files);

      // Create a new instance of Lodgedetails model or interact with the database
      //   const lodgeinfo = new Lodgedetails(
      //     bgcolor,
      //     lodgenumber,
      //     files["lodgelogo"],
      //     files["brotheronlybgimage"]
      //   );
      //   await lodgeinfo.save();
      //   // Perform necessary operations with lodgeinfo (e.g., save to database)

      //   // Send response
      //   res.status(200).json({ message: "Form data received successfully" });
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { lodgedetailController };

module.exports = { lodgedetailController };

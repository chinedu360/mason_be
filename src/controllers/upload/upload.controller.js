const XLSX = require("xlsx");
const { registerUser } = require("../auth/auth.controller");

async function fileUpload(req, res, next) {
  try {
    console.log("Uploading");
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }

    const excelFilePath = req.file.path;
    console.log(req.file, excelFilePath);

    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0];

    const workSheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(workSheet);

    const jsonData = JSON.stringify(data, null, 2);

    // console.log(jsonData);
    const dataWithEmail = data.filter((item) => item.EMAIL);

    let resp;
    // Register each user with an email
    for (const data of dataWithEmail) {
      // console.log({ user });
      resp = await registerUser(data, req, res, next);
    }

    // Send the JSON data in response
    return resp;
  } catch (error) {
    console.error("Error converting Excel to JSON:", error);
    res.status(500).send({ msg: "Error converting Excel to JSON.", error });
  }
}

module.exports = {
  fileUpload,
};

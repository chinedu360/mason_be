const XLSX = require("xlsx");
const { registerUser } = require("../auth/auth.controller");

async function fileUpload(req, res, next) {
  try {
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

    // Register each user with an email
    for (const user of dataWithEmail) {
      console.log({ user });
      await registerUser(user, req, res, next);
    }

    // Send the JSON data in response
    // res.status(200).json({ dataWithEmail, length: dataWithEmail.length });
  } catch (error) {
    console.error("Error converting Excel to JSON:", error);
    res.status(500).send("Error converting Excel to JSON.");
  }
}

module.exports = {
  fileUpload,
};

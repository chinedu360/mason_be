const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "masons_app",
});

module.exports = pool.promise();

// async function createDetails(email, phone) {
//   try {
//     const res = await pool.query(
//       `INSERT INTO details (email, phone) VALUES (?, ?)`,
//       [email, phone]
//     );

//     return res;
//   } catch (error) {
//     console.error("Error inserting details:", error.message);
//     return null;
//   }
// }

// // Wrap the usage of createDetails within an async function
// async function insertDummyData() {
//   const det = await createDetails("okere360@gmail.com", "0983676766");
//   if (det) {
//     console.log("Dummy data inserted successfully:", det);
//   } else {
//     console.log("Failed to insert dummy data.");
//   }
// }

// // Call the async function to execute the code
// insertDummyData()
//   .then(() => {
//     // Any subsequent code logic after inserting dummy data can be added here
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

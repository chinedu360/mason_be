const db = require("../../services/mysql");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports = class User {
  constructor(
    name,
    level,
    officerTitle, // Add officerTitle as a parameter
    phoneNumber,
    workPhone, // Add workPhone as a parameter
    email,
    address,
    password,
    passwordResetToken,
    passwordResetExpires,
    profilePicture
  ) {
    this.name = name;
    this.level = level;
    this.officerTitle = officerTitle; // Assign officerTitle property
    this.phoneNumber = phoneNumber;
    this.workPhone = workPhone; // Assign workPhone property
    this.email = email;
    this.address = address;
    this.password = password;
    this.passwordResetToken = passwordResetToken || null;
    this.passwordResetExpires = passwordResetExpires || null;
    this.profilePicture = profilePicture;
    this.passwordChangeAt = null;
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO users (name, level, officerTitle, phoneNumber, workPhone, email, address, password,passwordResetToken,passwordResetExpires, profilePicture, isBrother) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          this.name,
          this.level,
          this.officerTitle,
          this.phoneNumber,
          this.workPhone,
          this.email,
          this.address,
          this.password,
          this.passwordResetToken,
          this.passwordResetExpires,
          this.profilePicture,
          true, // Set isBrother to true
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

  static findByLevel(level) {
    return db.execute("SELECT * FROM users WHERE level = ?", [level]);
  }

  static async isValidPassword(enteredPassword, storedPassword) {
    console.log({ enteredPassword, storedPassword });
    try {
      const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
      console.log({ isMatch });
      return isMatch;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findById(userId) {
    try {
      const result = await db.execute("SELECT * FROM users WHERE id = ?", [
        userId,
      ]);
      return result[0]; // Assuming user data is stored in the first element of the result array
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
        [resetToken, resetExpires, email]
      );

      return resetToken;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async resetPassword(passwordResetToken) {
    try {
      const res = await db.execute(
        "SELECT * FROM users WHERE passwordResetToken = ? AND passwordResetExpires > NOW()",
        [passwordResetToken]
      );

      // Check if any rows were returned
      if (res[0].length === 0) {
        return new Error("Token expired or invalid");
      }

      // Extract the user ID from the result
      const userId = res[0][0].id;

      return userId;
    } catch (error) {
      // Log the error for debugging
      console.error(error);

      // Throw a custom error to be handled by the caller
      return new Error("Error resetting password");
    }
  }

  static async updatePassword(newPassword, userId) {
    try {
      const res = await db.execute(
        "UPDATE users SET password = ?, passwordResetToken = NULL, passwordResetExpires = NULL WHERE id = ?",
        [newPassword, userId]
      );

      return res.affectedRows;
    } catch (error) {
      throw new Error(error);
    }
  }
};

// const crypto = require("crypto");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
// var validator = require("validator");

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     // validator: [validator.isEmail, 'Pls Provide valid email']
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 8,
//   },
//   passwordConfirm: {
//     type: String,
//     required: true,
//     validate: {
//       //this works on CREATE and SAVE
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: "Password are not the same",
//     },
//   },
//   passwordChangeAt: {
//     type: Date,
//   },
//   role: {
//     type: String,
//     enum: ["public", "officer", "admin"],
//     default: "public",
//   },
//   address: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   profilePicture: {
//     type: String,
//     default: "default.png",
//   },
//   contactNumber: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   passwordResetToken: {
//     type: String,
//   },
//   passwordResetExpires: {
//     type: Date,
//   },
// });

// UserSchema.pre("save", async function (next) {
//   try {
//     // console.log('called before saving the user')
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     this.passwordConfirm = undefined;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// UserSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.passwordChangeAt = Date.now() - 1000;
//   next();
// });

// UserSchema.method.changePasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangeAt) {
//     // console.log(this.passwordChangeAt, JWTTimestamp)
//   }

//   return false;
// };

// UserSchema.methods.isValidPassword = async function (newPassword) {
//   try {
//     return await bcrypt.compare(newPassword, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// UserSchema.methods.createPasswordResetToken = async function () {
//   try {
//     const resetToken = crypto.randomBytes(32).toString("hex");

//     this.passwordResetToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");

//     // console.log({resetToken}, this.passwordResetToken)

//     this.passwordResetExpires = new Date(Date.now() + 20 * 60 * 1000);

//     return resetToken;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const bookmarkSchema = require("./Bookmark");

const userSchema = new Schema({
  googleId: String,
  username: String,
  email: String,
  hash: String,
  salt: String,
  signUpDate: String,
  lastLoggedIn: String,
  bookmarks: [bookmarkSchema],
});

//Securing passwords
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

mongoose.model("users", userSchema);

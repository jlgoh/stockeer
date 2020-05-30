const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
  symbolName: String,
  companyName: String,
  note: String,
  lastUpdated: String,
});

module.exports = bookmarkSchema;

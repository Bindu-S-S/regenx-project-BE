const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: String, // same as GridFS filename
  fileId: { type: String, ref: "uploads.files" },
  contentType: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  uploadDate: { type: Date, default: Date.now },
  region: String,
  description: String,
});

module.exports = mongoose.model("File", FileSchema);

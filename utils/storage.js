// storage.js
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const { conn, gfs } = require("../utils/filedb");

const storage = new GridFsStorage({
  url: "mongodb+srv://rupeshdevasam:Welcome123@cluster0.wt1he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  file: (req, file) => {
    try {
      // you can customize filename here
      console.log("file", file);
      return {
        _id: "1234",
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: "uploads", // must match gfs.collection()
        metadata: {
          userId: "hoo", // or req.user.id if you have auth middleware,
          _id: "1234", // or req.user._id if you have auth middleware,
        },
      };
    } catch (error) {
      console.error("Error in file function:", error);
      throw error; // rethrow the error to be handled by multer-gridfs-storage
    }
  },
});

const multer = require("multer");
const storage1 = multer.memoryStorage();
const upload = multer({ storage1 });

module.exports = upload;

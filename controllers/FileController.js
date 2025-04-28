const { conn, gfs } = require("../utils/filedb");
const File = require("../models/File");
const { mongoose } = require("mongoose");
const mongodb = require("mongodb");

// mongoose.connect();

class FileController {
  bucket;
  constructor() {
    // this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //   bucketName: "filesBucket",
    // });
    // (() => {
    // })();
    // mongoose
    //   .connect(
    //     "mongodb+srv://rupeshdevasam:Welcome123@cluster0.wt1he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    //   )
    //   .then(() => {
    //     console.log("connected to MongoDB database successfully");
    //   })
    //   .catch(() => {
    //     console.log(
    //       "error occurred while connecting to MongoDB database in the example file"
    //     );
    //   });
    // // let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    // this.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //   bucketName: "uploads",
    // });
  }
  async uploadFile(req, res, next) {
    try {
      const { file } = req;
      const { region, description } = req.body;
      console.log("file", file);
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const newFile = new File({
        filename: file.originalname,
        contentType: file.mimetype,
        size: file.size,
        uploadDate: new Date(),
        fileId: file.id,
        userId: req.user.id,
        region: region?.toLowerCase(), // Assuming you have user authentication
        description: description,
      });

      await newFile.save();

      res
        .status(200)
        .json({ message: "File uploaded successfully", file: newFile });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  }

  async downloadFile(req, res, next) {
    try {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "filesBucket",
      });
      const { fileId } = req.params;

      // Look up the file in GridFS
      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();
      if (!files.length) {
        return res.status(404).json({ error: { text: "File not found" } });
      }

      const file = files[0];

      // Tell the browser it's a PDF and to display it inline
      res.set("Content-Type", file.contentType || "application/pdf");
      res.set("Content-Disposition", `inline; filename="${file.filename}"`);

      // Stream the PDF to the response
      const downloadStream = bucket.openDownloadStream(file._id);
      downloadStream.pipe(res);

      downloadStream.on("error", (err) => {
        console.error("Stream error:", err);
        res.status(500).end();
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: { text: "Unable to download file", error } });
    }
  }

  async deleteFile(req, res, next) {
    try {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "filesBucket",
      });
      const { fileId } = req.params;

      // Look up the file in GridFS
      const files = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();
      if (!files.length) {
        return res.status(404).json({ error: { text: "File not found" } });
      }

      await File.deleteOne({ fileId: fileId });

      // Delete the file from GridFS
      await bucket.delete(new mongoose.Types.ObjectId(fileId));

      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: { text: "Unable to delete file", error } });
    }
  }

  async fetchAllUserFiles(req, res, next) {
    try {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "filesBucket",
      });
      //   const {  } = req.params;
      const userId = req.user.id;
      const allFiles = await File.find({
        userId: new mongoose.Types.ObjectId(userId),
      });

      // Check if file exists
      const file = await bucket.find({}).toArray();
      res.status(200).json({
        message: "Files fetched successfully",
        files: allFiles,
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: { text: `Unable to download file`, error } });
    }
  }

  async fetchAllFilesByRegion(req, res, next) {
    try {
      const { region } = req.query;
      const filter = {};
      if (region) {
        filter.region = region.toLowerCase();
      }
      const allFiles = await File.find(filter);

      // Check if file exists
      res.status(200).json({
        message: "Files fetched successfully",
        files: allFiles,
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: { text: `Unable to download file`, error } });
    }
  }
}

module.exports = new FileController();

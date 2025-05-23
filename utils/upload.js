const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
function upload() {
  try {
    const mongodbUrl =
      "mongodb+srv://yerramsettibindusai19:Bindu123@cluster0.xjrefhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const storage = new GridFsStorage({
      url: mongodbUrl,
      file: (req, file) => {
        return new Promise((resolve, _reject) => {
          const fileInfo = {
            filename: file.originalname,
            bucketName: "filesBucket",
          };
          resolve(fileInfo);
        });
      },
    });

    return multer({ storage });
  } catch (error) {
    throw error;
  }
}

module.exports = { upload };

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
function upload() {
  const mongodbUrl = `mongodb+srv://rupeshdevasam:Welcome123@cluster0.wt1he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
}

module.exports = { upload };

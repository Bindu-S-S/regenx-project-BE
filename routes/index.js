var express = require("express");
const userController = require("../controllers/userController");
const { auth } = require("../middleware/auth");
const PaperController = require("../controllers/PaperController");
const FileController = require("../controllers/FileController");
var router = express.Router();
const { upload } = require("../utils/upload");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/papers/fetch", auth, PaperController.fetchAll);
router.get("/file/:fileId", FileController.downloadFile);
router.post("/upload", auth, upload().single("pdf"), FileController.uploadFile);
router.get("/files", auth, FileController.fetchAllUserFiles);
router.delete("/file/:fileId", auth, FileController.deleteFile); // Delete a file by ID
router.get("/files/region/", FileController.fetchAllFilesByRegion); // Fetch files by region
router.post("/history/", auth, userController.addToHistory); // Add to history
router.get("/history/", auth, userController.fetchHistory); // Fetch history
router.get("/user/", auth, userController.fetchUser); // Fetch user details
router.patch("/user/", auth, userController.updateUser); // Update user details

module.exports = router;

const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const mongoURI =
  "mongodb+srv://rupeshdevasam:Welcome123@cluster0.wt1he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // this will create `uploads.files` & `uploads.chunks`
});

module.exports = { conn, gfs };

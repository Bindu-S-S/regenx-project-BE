var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const socketio = require("socket.io");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const connectDB = require("./utils/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

var app = express();

app.use(cors());
const server = http.createServer(app);

// DB connect

connectDB();

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;

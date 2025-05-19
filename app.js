var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const connectDB = require("./utils/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

var app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// DB connect
connectDB();

// GridFS bucket setup
let bucket;
mongoose.connection.on("connected", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "filesBucket",
  });
  console.log("GridFS bucket initialized");
});

// Middleware
app.use(logger("dev"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Mount routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 handler
app.use(function (req, res, next) {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error('Error:', err.message);
  res.status(err.statusCode || err.status || 500).json({ 
    error: err.message,
    path: req.url 
  });
});

module.exports = app;
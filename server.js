const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/courses", require("./routes/api/courses"));
app.use("/api/videos", require("./routes/api/videos"));
app.use("/api/comment", require("./routes/api/comment"));

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
// Serve static assets in production
//if (process.env.NODE_ENV === "production") {
// Set static folder
app.use(express.static("client/build"));
app.use("/uploads", express.static("uploads"));
app.use("/uploads/thumbnails", express.static("uploads/thumbnails"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
//}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

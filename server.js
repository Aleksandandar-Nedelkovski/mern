const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/groups", require("./routes/api/groups"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/category", require("./routes/api/category"));
app.use("/api/courses", require("./routes/api/courses"));
app.use("/api/enrollments", require("./routes/api/enroll"));
app.use("/api/lecture", require("./routes/api/lecture"));
app.use("/api/videos", require("./routes/api/videos"));
app.use("/api/comment", require("./routes/api/comment"));
app.use("/api/subscribe", require("./routes/api/subscribe"));

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

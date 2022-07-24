const colors = require("colors");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const path = require("path");
var cors = require("cors");

// connect to DB
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// **** Routes ****
// User routes
app.use("/api/users", require("./routes/userRoutes"));
// Ticket routes
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Production
if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", index.html)
  );
} else {
  app.get("/", (req, res) =>
    res.json({ message: "Welcome to the Support Desk API" })
  );
}

// Middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));

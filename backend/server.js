const { setRandomFallback } = require("bcryptjs");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) =>
  res.json({ message: "Welcome to the Support Desk API"})
);

// **** Routes ****
// User routes

app.use('/api/users', require('./routes/userRoutes'))



// Middleware

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
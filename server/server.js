const dotenv = require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Routes
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

app.use(cors());

app.use(express.json());

// Use router
app.use("/api/items", items);
app.use("/api/auth", auth);
app.use("/api/users", users);

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const items = require("./routes/api/items");

const app = express();

app.use(cors({
  origin: 'https://mern-todoapp.netlify.app/'
}));

app.use(express.json());

app.use("/api/items", items);

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

app.use(express.json());

app.use("/api/items", items);

// Connect to database
connectDB();

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

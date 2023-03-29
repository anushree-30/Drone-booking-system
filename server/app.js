const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
app.use(express.json());
connectDB();

require("./models/booking");
require("./models/customer");

app.use(require("./routes/booking"));
app.use(require("./routes/customer"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});

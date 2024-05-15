const express = require("express");
const bodyParser = require("body-parser");
const compilerRoutes = require("./routes/compilerRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/compile", compilerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

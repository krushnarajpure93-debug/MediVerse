require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

console.log("server.js loaded");
console.log("MONGODB_URI =", process.env.MONGODB_URI);

connectDB(); // must be here

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

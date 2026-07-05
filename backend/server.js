require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

console.log("server.js loaded");
// सुरक्षा के लिए MONGODB_URI का console.log यहाँ से हटा दिया गया है

// MongoDB से कनेक्ट करें
connectDB();

const PORT = process.env.PORT || 8080;

// '0.0.0.0' जोड़ने से यह सभी लोकल IP एड्रेस पर रिक्वेस्ट स्वीकार करेगा, 
// जिससे PowerShell की 'Unable to connect' एरर दूर हो जाएगी।
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on:`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Network: http://127.0.0.1:${PORT}/`);
});
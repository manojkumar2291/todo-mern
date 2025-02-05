const mongoose = require("mongoose");
require("dotenv").config(); 


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/todoApp";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Create Model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };

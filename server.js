import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRoutes from "./src/routes/usersRoutes.js";
import filesRoutes from "./src/routes/filesRoutes.js";

dotenv.config(); // Load environment variables from the .env file

// Instantiate the Express server
const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env or fallback to 3000

// Middleware to handle JSON requests
app.use(express.json()); // Required for parsing JSON data in POST/PUT requests

// Middleware cors
const corsOptions = {
  origin: process.env.URL_KEY,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// User-related routes
usersRoutes(app);

// File-related routes
filesRoutes(app);

// Serve images statically from the "uploads" directory
app.use("/images/files", express.static("uploads"));

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

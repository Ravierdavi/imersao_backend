import multer from "multer";
import {
  getAllImages,
  getImageById,
  uploadImage,
  updateImage,
} from "../controllers/filesControllers.js";
import { generateText } from "../services/geminiService.js";

// Configure the storage settings for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage }); // Multer instance with defined storage

// Define routes related to image handling
const routes = (app) => {
  // Route to retrieve all images
  app.get("/images", getAllImages);

  // Route to retrieve a single image by its ID
  app.get("/images/:id", getImageById);

  // Route to handle image uploads
  app.post("/images/upload", upload.single("image"), uploadImage);

  // Route to update image metadata
  app.put("/images/:id", updateImage);

  // AI routes
  app.post("/generateText", generateText);
};

export default routes;

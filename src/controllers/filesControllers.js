import fs from "fs";
import {
  createImageRecord,
  fetchAllImages,
  updateImageRecord,
} from "../models/filesModel.js";
import { generateDescription } from "../services/geminiService.js";

// Controller to fetch all images
export async function getAllImages(_, res) {
  try {
    const images = await fetchAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve images." });
  }
}

// Controller to fetch a single image by ID
export async function getImageById(req, res) {
  const id = req.params.id;
  try {
    const images = await fetchAllImages();
    const image = images.find((img) => img._id.toString() === id);

    if (!image) return res.status(404).json({ error: "Image not found." });

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the image." });
  }
}

// Controller to upload an image
export async function uploadImage(req, res) {
  const imgData = {
    imgName: req.file.originalname, // Original file name
    description: "", // Placeholder for image description
    imgUrl: "", // Placeholder for the URL (updated later)
    alt: "", // Placeholder for alt text
  };

  try {
    // Save image metadata to the database
    const result = await createImageRecord(imgData);
    const createdId = result.insertedId;

    // Rename the uploaded file to match the database ID
    const renamedFilePath = `uploads/${createdId}.png`;
    fs.renameSync(req.file.path, renamedFilePath);

    // Update the image record with the new file URL
    await updateImageRecord(createdId.toString(), {
      imgUrl: `/images/files/${createdId}.png`,
    });

    res.status(200).json({ url: `/images/files/${createdId}.png` });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload the image." });
  }
}

// Controller to update image metadata
export async function updateImage(req, res) {
  const id = req.params.id;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateDescription(imgBuffer);
    console.log(description);
    const updatedImgData = {
      description: description || "No description.",
      alt: req.body.alt || "",
    };
    const result = await updateImageRecord(id, updatedImgData);
    res.status(200).json({ message: "Image updated successfully.", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update image." });
  }
}

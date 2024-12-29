import { ObjectId } from "mongodb";
import connectDB from "../config/dbConfig.js";

// Retrieve all image records from the database
export async function fetchAllImages() {
  try {
    const client = await connectDB(process.env.MONGODB_URI);
    const db = client.db("ravierdavi");
    const collection = db.collection("images");

    return await collection.find({}).toArray();
  } catch (error) {
    console.error("Error retrieving images:", error.message);
    throw new Error("Database query failed.");
  }
}

// Add a new image record to the database
export async function createImageRecord(imgObj) {
  try {
    const client = await connectDB(process.env.MONGODB_URI);
    const db = client.db("ravierdavi");
    const collection = db.collection("images");

    return await collection.insertOne(imgObj);
  } catch (error) {
    console.error("Error creating image record:", error.message);
    throw new Error("Database insertion failed.");
  }
}

// Update an existing image record in the database
export async function updateImageRecord(id, updatedData) {
  try {
    const client = await connectDB(process.env.MONGODB_URI);
    const db = client.db("ravierdavi");
    const collection = db.collection("images");

    const objId = ObjectId.createFromHexString(id);
    return await collection.updateOne(
      { _id: new ObjectId(objId) },
      { $set: updatedData }
    );
  } catch (error) {
    console.error("Error updating image record:", error.message);
    throw new Error("Database update failed.");
  }
}

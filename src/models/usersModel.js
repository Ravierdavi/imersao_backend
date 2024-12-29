import connectDB from "../config/dbConfig.js";

// Retrieve all users from the database
export async function getAllUsers() {
  try {
    const client = await connectDB(process.env.MONGODB_URI);
    const database = client.db("ravierdavi");
    const collection = database.collection("users");

    const findResult = await collection.find({}).toArray();
    return findResult;
  } catch (error) {
    console.log("Error fetching users:", error.message);
    throw new Error("Database query failed");
  }
}

export async function createUser(userObj) {
  try {
    const client = await connectDB(process.env.MONGODB_URI);
    const database = client.db("ravierdavi");
    const collection = database.collection("users");

    return await collection.insertOne(userObj);
  } catch (error) {
    console.log("Error posting user:", error.message);
    throw new Error("Database post failed");
  }
}

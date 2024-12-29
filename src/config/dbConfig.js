import { MongoClient } from "mongodb";

let client; // Store the database connection

// Connect to MongoDB
export default async function connectDB(uri) {
  if (client) return client; // Returns the current client if connection is already established (Singleton pattern)

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Database connected sucessfully!");
    return client;
  } catch (error) {
    console.log("Database connection failed", error.message);
    process.exit(1);
    // 0: Success
    // 1-127: General errors
    // 128-255: System errors
  }
}

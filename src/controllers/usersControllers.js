import { createUser, getAllUsers } from "../models/usersModel.js";

// Fetch all users from the database
export async function listUsers(_, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// Fetch a single user by ID
export async function listUser(req, res) {
  const id = req.params.id;

  try {
    const users = await getAllUsers(); // Fetch all users (can be optimized by fetching a single user)
    const user = users.find((user) => user._id.toString() === id);

    if (!user) return res.status(404).send("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
}

// Create a new user in the database
export async function postNewUser(req, res) {
  const newUser = req.body; // Data sent in the request body
  console.log(newUser);

  try {
    const createdUser = await createUser(newUser); // Save the user in the database
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

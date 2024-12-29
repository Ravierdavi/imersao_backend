import {
  listUser,
  listUsers,
  postNewUser,
} from "../controllers/usersControllers.js";

const routes = (app) => {
  // Route to fetch all users
  app.get("/users", listUsers);

  // Route to create a new user
  app.post("/users", postNewUser);

  // Route to fetch a single user by id
  app.get("/users/:id", listUser);
};

export default routes;

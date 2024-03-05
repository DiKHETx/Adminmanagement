const express = require("express");
const route = express.Router();
const {
  login,
  register,
  updateUser,
  getAllUsers,
  deleteUsers,
  searchUser
} = require("../controllers/users");

route.post("/login", login);
route.post("/register", register);
route.patch('/:userId', updateUser);

route.get("/", getAllUsers);
route.get("/search", searchUser);
route.delete("/:userId", deleteUsers)

module.exports = route;

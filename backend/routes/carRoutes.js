const { Router } = require("express");
const {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
} = require("../controllers/carContollers");
const { verifyToken } = require("../utils/token-manager");
const { carValidator } = require("../utils/validator");

const carRoutes = Router();

// Define routes
carRoutes.get("/", verifyToken, getCars);
carRoutes.post("/", verifyToken, createCar);
carRoutes.get("/search", verifyToken, searchCars);
carRoutes.get("/:id", verifyToken, getCar);
carRoutes.put("/:id", verifyToken, updateCar);
carRoutes.delete("/:id", verifyToken, deleteCar);

module.exports = carRoutes;

const mongoose = require("mongoose")
const Car = require("../models/carSchema");
const User = require("../models/userSchema")
// Get all cars
const getCars = async (req, res, next) => {
  try {
    const cars = await Car.find().populate("user");
    return res.status(200).json({ message: "OK", cars });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// Create a new car
const createCar = async (req, res, next) => {
  try {
    // Get the user ID from the verified JWT token (set by verifyUser middleware)
    const userId = res.locals.jwtData.id;
    
    // If userId is not found, return an error
    if (!userId) {
      return res.status(401).json({ message: "User not authorized" });
    }
    
    const { title, description, images, tags } = req.body;

    // Validate the user ID to make sure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Check if the user exists in the database (optional, but recommended)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the car with the same title already exists
    const existingCar = await Car.findOne({ title });
    if (existingCar) {
      return res.status(400).json({ message: "Car with this title already exists" });
    }

    // Create the car document with the verified user ID
    const newCar = new Car({
      title,
      description,
      images,
      tags,
      user: userId, // Use the user ID from the JWT token
    });
    
    // Save the car to the database
    await newCar.save();

    // Respond with success
    return res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
// Search cars by tags
const searchCars = async (req, res, next) => {
  try {
    const { tags } = req.query;
    
    // Check if tags parameter is present
    if (!tags) {
      return res.status(400).json({ message: "Tags parameter is required" });
    }

    // Split the tags string into an array
    const tagsArray = tags.split(",");

    // Find cars with any of the tags in the tags array
    const cars = await Car.find({ tags: { $in: tagsArray } });
    return res.status(200).json({ message: "OK", cars });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
// Get a single car by ID
const getCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id).populate("user");
    if (!car) return res.status(404).json({ message: "Car not found" });
    return res.status(200).json({ message: "OK", car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};


// Update a car by ID
const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, images, tags } = req.body; // Extract only the fields we want to update

    // Validate the provided fields if necessary (optional step, depending on your use case)
    if (title && typeof title !== 'string') {
      return res.status(400).json({ message: "Invalid title format" });
    }
    if (description && typeof description !== 'string') {
      return res.status(400).json({ message: "Invalid description format" });
    }
    if (images && !Array.isArray(images)) {
      return res.status(400).json({ message: "Images should be an array of strings" });
    }
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({ message: "Tags should be an array of strings" });
    }

    // Find the car by ID and update only the specified fields
    const car = await Car.findByIdAndUpdate(
      id, 
      { title, description, images, tags }, // Only update the fields provided in the request body
      { new: true, runValidators: true } // Return the updated car and validate the data
    );
    
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Respond with success
    return res.status(200).json({ message: "Car updated successfully", car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};


// Delete a car by ID
const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    return res.status(200).json({ message: "Car deleted successfully", car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};


module.exports = {
  createCar,
  getCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
};

import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State for the image URL
  const navigate = useNavigate();
  const { addCar } = useAuth(); // Destructure addCar from AuthContext

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageUrl) {
      toast.error("Please fill out all fields and provide an image URL");
      return;
    }

    try {
      // Create a new car using the addCar function from AuthContext
      const newCar = await addCar(title, description, imageUrl, []); // Add any tags if needed
      if (newCar) {
        toast.success("Car added successfully");

        // Redirect to the ProductList page
        navigate("/products"); // Navigate to the ProductList route
      }
    } catch (error) {
      console.error("Error adding car:", error.message);
      toast.error("An error occurred while adding the car");
    }
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        Create New Car
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Car
        </Button>
      </form>
    </Box>
  );
};

export default ProductCreate;

import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { cars, fetchCars, updateCar, deleteCar, loading } = useAuth();

  useEffect(() => {
    if (!cars.length) {
      fetchCars(); // Ensure cars are fetched
    }
  }, [cars, fetchCars]);

  const car = cars.find((car) => car.id === id);

  useEffect(() => {
    if (car) {
      setTitle(car.title || "");
      setDescription(car.description || "");
      setTags(car.tags?.join(", ") || "");
    }
  }, [car]);

  const handleDelete = async () => {
    try {
      await deleteCar(id, localStorage.getItem("userToken"));
      toast.success("Car deleted successfully");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }
    setImage(file);
  };

  const handleUpdate = async () => {
    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }

    const updatedData = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      image: image || car.image,
    };

    try {
      await updateCar(id, updatedData, localStorage.getItem("userToken"));
      toast.success("Car updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update car");
    }
  };

  if (loading || !cars.length) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!car) {
    return (
      <Typography variant="body1" textAlign="center" mt={4}>
        Car not found.
      </Typography>
    );
  }

  return (
    <Box padding={4}>
      <Typography variant="h4" textAlign="center" mb={4}>
        {isEditing ? "Edit Car" : car.title}
      </Typography>
      {isEditing ? (
        <Box component="form">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            sx={{ mb: 2 }}
          />
          <TextField
            label="Tags (comma-separated)"
            variant="outlined"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" component="label" sx={{ mb: 2 }}>
            Upload New Image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
          {image && (
            <Typography variant="body2" color="textSecondary">
              {image.name}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Car
          </Button>
          <Button variant="text" color="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Box>
      ) : (
        <>
          <Box textAlign="center" mb={4}>
            <img
              src={car.image || "default-image.jpg"}
              alt={car.title || "Car image"}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </Box>
          <Typography variant="body1" paragraph>
            {car.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tags: {car.tags?.join(", ") || "No tags available"}
          </Typography>
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;

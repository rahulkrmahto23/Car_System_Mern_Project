import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  // Function to handle edit button click
  const handleEdit = () => {
    navigate(`/products/${car.id}`); // Adjust the route based on your application's structure
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={car.images && car.images.length > 0 ? car.images[0] : "default-image.jpg"} // Check if images are available
        alt={car.title}
      />
      <CardContent>
        <Typography variant="h6">{car.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {car.description}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarCard;

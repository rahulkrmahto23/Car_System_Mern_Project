import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField } from "@mui/material";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";  // Import useAuth from your context
import CarCard from "../components/carCard/carCard"; // Assuming you have a CarCard component to display individual car details

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");  // State for search term
  const { cars, fetchCars } = useAuth();  // Access cars and fetchCars from the context

  useEffect(() => {
    fetchCars();  // Fetch the cars when the component mounts
  }, [fetchCars]);

  // Filter cars based on search term
  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box padding={4}>
      <Header />
      <Typography variant="h4" textAlign="center" mb={4}>
        Cars List
      </Typography>
      
      {/* Search bar for filtering cars */}
      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          style: { color: "white" }, // Set the input text color to white
        }}
        InputLabelProps={{
          style: { color: "white" }, // Set the label text color to white
        }}
        sx={{ mb: 4 }}
      />
      
      {/* Display filtered cars */}
      <Grid container spacing={4}>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car._id}>
              <CarCard car={car} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ width: "100%" }}>
            No cars found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;

import axios from "axios";

// Function to handle axios errors
const handleError = (error) => {
    console.error("API error:", error.response || error.message || error);
    const message = error.response?.data?.message || "An error occurred";
    throw new Error(message);
  };

export const loginUser = async (email, password) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout");
    }
    const data = await res.data;
    return data;
  };

  // Get all cars
export const getCars = async () => {
    try {
      const res = await axios.get("/car/");
      return res.data.cars; // Return the list of cars
    } catch (error) {
      handleError(error);
    }
  };

  export const createCar = async (title, description, images, tags) => {
    try {
      const res = await axios.post("/car/", { title, description, images, tags });
      if (res.status !== 201) {
        throw new Error("Unable to create car");
      }
      const data = await res.data;
      return data;
    } catch (error) {
      handleError(error);  // Use the existing error handler
    }
  };
  // Update a car by ID
export const updateCar = async (id, updatedData, token) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/cars/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }, // Authorization header
      });
      return res.data.car; // Return the updated car
    } catch (error) {
      handleError(error);
    }
  };
  
  // Delete a car by ID
  export const deleteCar = async (id, token) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Authorization header
      });
      return res.data.message; // Return success message
    } catch (error) {
      handleError(error);
    }
  };
  
  
  



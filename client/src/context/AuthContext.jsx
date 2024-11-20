    import React, { createContext, useContext, useEffect, useState } from "react";
    import {
    checkAuthStatus,
    loginUser,
    logoutUser,
    signupUser,
    getCars, // Import the getCars function
    createCar, // Import the createCar function
    } from "../helper/api-communicator";
    import axios from "axios";

    // Create the authentication context
    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cars, setCars] = useState([]); // State to store the cars

    useEffect(() => {
        // Check if the user's cookies are valid, and if so, skip login
        async function checkStatus() {
        try {
            const data = await checkAuthStatus();
            if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error checking auth status:", error.message);
        }
        }
        checkStatus();
    }, []);

    const login = async (email, password) => {
        try {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
        } catch (error) {
        console.error("Error logging in:", error.message);
        }
    };

    const signup = async (name, email, password) => {
        try {
        const data = await signupUser(name, email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
        } catch (error) {
        console.error("Error signing up:", error.message);
        }
    };

    const logout = async () => {
        try {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
        } catch (error) {
        console.error("Error logging out:", error.message);
        }
    };

    // Function to fetch cars
    const fetchCars = async () => {
        try {
        const carsData = await getCars();
        setCars(carsData); // Store cars in state
        } catch (error) {
        console.error("Error fetching cars:", error.message);
        }
    };

    // Function to create a new car
    const addCar = async (title, description, images, tags) => {
        try {
        const newCar = await createCar(title, description, images, tags);
        // Update the cars state by adding the new car to the existing list
        setCars((prevCars) => [...prevCars, newCar]);
        } catch (error) {
        console.error("Error creating car:", error.message);
        }
    };

    // Function to update a car by ID
    const updateCar = async (id, updatedData, token) => {
        try {
        const res = await axios.put(`${API_BASE_URL}/cars/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }, // Authorization header
        });
        return res.data.car; // Return the updated car
        } catch (error) {
        console.error("Error updating car:", error.message);
        }
    };

    // Function to delete a car by ID
    const deleteCar = async (id, token) => {
        try {
        const res = await axios.delete(`${API_BASE_URL}/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` }, // Authorization header
        });
        return res.data.message; // Return success message
        } catch (error) {
        console.error("Error deleting car:", error.message);
        }
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
        cars, // Provide cars in the context
        fetchCars, // Provide fetchCars function in the context
        addCar, // Provide addCar function in the context
        updateCar, // Provide updateCar function in the context
        deleteCar, // Provide deleteCar function in the context
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    // Custom hook to use the AuthContext
    export const useAuth = () => useContext(AuthContext);

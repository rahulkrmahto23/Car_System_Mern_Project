import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
//import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate"
import ProductDetail from "./pages/ProductDetail";
function App() {
  return (
    <main>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/productcreate" element={<ProductCreate/>} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </main>
  );
}

export default App;

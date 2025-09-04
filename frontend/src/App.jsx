<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
=======
import React, { useContext, useEffect } from 'react'
import "./App.css";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
>>>>>>> 196efa6 (feat: latest UI updates)
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./pages/Login";
<<<<<<< HEAD
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
=======
//import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context } from './main';
import axios from 'axios';
import Footer from './components/Footer';
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me", 
          {withCredentials: true});
>>>>>>> 196efa6 (feat: latest UI updates)
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
<<<<<<< HEAD

  return (
    <>
      <Router>
        <Navbar />
=======
  return (
    <>
      <Router>
        <Navbar/>
>>>>>>> 196efa6 (feat: latest UI updates)
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
<<<<<<< HEAD
        <Footer />
        <ToastContainer position="top-center" />
=======
        <Footer/>
        <ToastContainer position="top-center"/>
>>>>>>> 196efa6 (feat: latest UI updates)
      </Router>
    </>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 196efa6 (feat: latest UI updates)

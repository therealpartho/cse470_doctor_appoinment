<<<<<<< HEAD
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
=======
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../main";
import axios from 'axios';
import { toast } from 'react-toastify';
import {GiHamburgerMenu} from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();


  const handleLogout = async()=>{
       await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
    })
    .then(res=> {
        toast.success(res.data.message);
        setIsAuthenticated(false);

    })
    .catch(err=>{
        toast.error(err.response.data.message);

    });
    
    
  };
 



  const gotoLogin = async()=>{
    navigateTo("/login");
  };





  return (
    <nav className='container'>
        <div className="logo">
            {" "}
            <img src="/logo.png" alt="logo" className='logo-img' />
            </div>
        <div className={show ? "navLinks showmenu": "navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>APPOINTMENT</Link>
                <Link to={"/about"}>ABOUT US</Link>
            </div>
            {isAuthenticated ? (
                <button className='logoutBtn btn' onClick={handleLogout}>
                    LOGOUT
                    </button>
                ):(
                <button className='logoutBtn btn'onClick={gotoLogin}>
                    LOGIN
                    </button>
                )}

        </div>
        <div className='hamburger' onClick={()=> setShow(!show)}>
            <GiHamburgerMenu/>

        </div>

    </nav>
>>>>>>> 196efa6 (feat: latest UI updates)
  );
};

export default Navbar;
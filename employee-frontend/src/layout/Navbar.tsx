import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Navbar = () => {
  return (

    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand ms-3">
            <span className="navBrand">Employee Management Application</span>
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav navLinks">
              <li>
                <Link to="/create-employee" className="nav-link">
                  Create-Employee
                </Link>
              </li>
              <li>
                <Link to="/employees" className="nav-link">
                  View-Employees
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Footer/>
    </div>
   
  );
};

export default Navbar;

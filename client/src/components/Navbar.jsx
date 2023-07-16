import React from "react";
import { Link,useLocation } from "react-router-dom";
const Navbar = () => {
    let location =useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">EveryNote</Link >
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className={`nav-link  ${((location.pathname==="/")? "active":"")}`} aria-current="page" to="/">Home</Link >
          </li>
          {
            !localStorage.getItem("auth-token")? <ul className="navbar-nav">
            <li className="nav-item">
            <Link className={`nav-link  ${((location.pathname==="/Login")?("active"):"")}`}to="/Login">login</Link >
    
            </li>
            <li className="nav-item">
              <Link className={`nav-link  ${((location.pathname==="/register")?("active"):"")}`}to="/register">Register</Link >
            </li>
            </ul>:<button className='btn btn-primary'>logout</button>
          }
         
         
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;

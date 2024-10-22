import React from 'react';
import { Link } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';
import './NavBar.css'; // Ensure you create this file for custom styles

export default function NavBar(props) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            <img src="/images/la_rivera.jpg" alt="Cafe Logo" className="cafe-logo me-2" /> {/* Logo */}
            <span className="navbar-title">{props.title}</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/AddItem">Add Item</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/UpdateItem">Update item</Link>
              </li>
              
    
            </ul>
           
          </div>
        </div>
      </nav>
    </div>
  );
}

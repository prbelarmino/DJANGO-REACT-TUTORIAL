// UpperBar.js
import React from 'react';
import '../styles/UpperBar.css'; // Import CSS for styling

const UpperBar = () => {
  return (
    <div className="upper-bar">
      <div className="logo">My App</div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
      </nav>
    </div>
  );
};

export default UpperBar;

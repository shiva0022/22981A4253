import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>AffordMed URL Shortener</h4>
            <p>Making the web more accessible, one link at a time.</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Free URL shortening</li>
              <li>No registration required</li>
              <li>Instant results</li>
              <li>Link history</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AffordMed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

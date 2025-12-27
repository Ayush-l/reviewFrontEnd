import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <section className="contact-section">
      <footer className="contact-footer">
        <div className="footer-col brand">
          <h3>The Review Website®</h3>
        </div>

        <div className="footer-col">
          <h4>FIRST</h4>
          <p>
            <a href="mailto:aayushlingwal24@google.com">
              aayushlingwal24@google.com
            </a>
          </p>
          <p>+91 94 5611 7757</p>
          <p>
            Near BRMS, Pauri, 246001
            <br />
            Pauri Garhwal, Uttarakhand
          </p>
        </div>

        <div className="footer-col">
          <h4>SECOND</h4>
          <p>
            <a href="mailto:ayush_l@hs.iitr.ac.in">
              ayush_l@hs.iitr.ac.in
            </a>
          </p>
          <p>+91 94 1012 9502</p>
          <p>
            HSS Department, IIT Roorkee, Roorkee, 247667
            <br />
            Haridwar, Uttarakhand
          </p>
        </div>

        <div className="footer-col">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/aayush_lingwal_/" className="hover-pink">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/ayush-lingwal-a10a0a2a6/" className="hover-blue">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;

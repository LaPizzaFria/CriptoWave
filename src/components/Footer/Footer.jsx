import React from 'react'
import "./Footer.css"
import { TiSocialInstagram } from "react-icons/ti";
import { FaSquareGithub } from "react-icons/fa6";
import { RiLinkedinBoxLine } from "react-icons/ri";

const Footer = () => {
    return (
      <footer id="contact" className="footer">
        <div className="container">
          <h2 className="neon-effect">Mis Contactos</h2>
          
          <div className="social-icons">
            <div className="social-item">
              <a href="https://www.instagram.com/fa_bangerte02/" aria-label="Instagram" className="social-icon">
                <TiSocialInstagram />
              </a>
              <p className="social-text">Instagram</p>
            </div>
            <div className="social-item">
              <a href="https://github.com/LaPizzaFria" aria-label="GitHub" className="social-icon">
                <FaSquareGithub />
              </a>
              <p className="social-text">GitHub</p>
            </div>
            <div className="social-item">
              <a href="https://www.linkedin.com/in/facundo-bangerte-9b3602222/" aria-label="LinkedIn" className="social-icon">
                <RiLinkedinBoxLine />
              </a>
              <p className="social-text">LinkedIn</p>
            </div>
          </div>
          <p className="footer-text">© 2025, Creado Por Facundo Bangerte.</p>
        </div>
      </footer>
    );
};

export default Footer;

import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="top-bar-left">
          <span>
            <i className="fa-solid fa-phone"></i>
            +977-9847566866
          </span>

          <span>
            <i className="fa-solid fa-envelope"></i>
            s2s.consultant.education@gmail.com
          </span>

          <span>
            <i className="fa-solid fa-location-dot"></i>
            Tansen-7, Pravash Palpa
          </span>
        </div>

        <div className="social-links">
          <a
            href="https://facebook.com/s2selectricals"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>

          <a
            href="https://wa.me/9847566866"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="navbar-sec">
        <a
          href="#home"
          className="logo-section"
          onClick={closeMenu}
        >
          <img src={logo} alt="S2S Logo" />
          <h2>S2S Consultant & Technical Education Center</h2>
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#team" onClick={closeMenu}>
            Our Team
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#gallery" onClick={closeMenu}>
            Gallery
          </a>

          <a href="#register" onClick={closeMenu}>
            Register
          </a>

          <a href="#Contact" onClick={closeMenu}>
            Contact
          </a>
          <a href="/admin" onClick={closeMenu}>
  Admin
</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

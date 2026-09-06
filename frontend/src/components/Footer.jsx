function Footer() {
  return (
    <footer className="site-footer" id="Contact">
      <div className="footer-container">

        <div className="footer-column">
          <h3>S2S Consultant & Technical Education Center</h3>

          <p>
            Quality education, technical training, career guidance,
            and professional services to help you build your future.
          </p>

          <div className="footer-contact">
            <p>
              <i className="fa-solid fa-location-dot"></i>
              Tansen-7, Pravash Palpa, Nepal
            </p>

            <p>
              <i className="fa-solid fa-phone"></i>
              +977-9847566866
            </p>

            <p>
              <i className="fa-solid fa-envelope"></i>
              s2s.consultant.education@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#team">Our Team</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#register">Register</a>
          <a href="#Contact">Contact</a>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>

          <a href="#services">Computer Classes</a>
          <a href="#services">Language Classes</a>
          <a href="#services">Accounting Training</a>
          <a href="#services">Career Counselling</a>
          <a href="#services">Technical Training</a>
        </div>

        <div className="footer-column footer-map">
          <h3>Find Us</h3>

          <iframe
            title="S2S Location Map"
            src="https://www.google.com/maps?q=Tansen-7,+Pravash,+Palpa,+Nepal&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 S2S Consultant & Technical Education Center.
          All Rights Reserved.
        </p>

        <div className="footer-social">
          <a
            href="https://facebook.com/s2selectricals"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>

          <a
            href="https://wa.me/9847566866"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
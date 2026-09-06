function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">

        <p className="hero-eyebrow">
          Tansen-7, Palpa
        </p>

        <h1>
          Your Trusted Partner in
          <span> Education & Career Consulting</span>
        </h1>

        <p className="hero-description">
          S2S Consultant & Technical Education Center is your trusted
          partner for quality education, technical training, career
          guidance, and professional development. We provide computer
          training, language courses, accounting, business support,
          and various technical education programs.
        </p>

        <div className="hero-buttons">
          <a href="#register" className="btn-primary">
            Register Now
          </a>

          <a href="#services" className="btn-secondary">
            Our Services
          </a>
        </div>

      </div>

      <div className="hero-image">
        <div className="hero-illustration">
          <i className="fa-solid fa-graduation-cap"></i>
          <i className="fa-solid fa-laptop"></i>
        </div>
      </div>
    </section>
  );
}

export default Hero;
import { useEffect, useState } from "react";

import office from "../assets/office.jpg";
import image2 from "../assets/2.jpg";
import image4 from "../assets/4.jpg";
import image3 from "../assets/3.jpg";
import classImage from "../assets/class.jpg";

function Gallery() {
  const images = [
    office,
    image2,
    image4,
    image3,
    classImage,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-heading">
        <p>Our Gallery</p>
        <h2>Moments at S2S</h2>
        <span>
          Take a look at our training, classes, and activities.
        </span>
      </div>

      <div className="gallery-slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div className="gallery-slide" key={index}>
              <img
                src={image}
                alt={`S2S Gallery ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="gallery-btn gallery-prev"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          className="gallery-btn gallery-next"
          onClick={nextSlide}
          aria-label="Next image"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}

export default Gallery;
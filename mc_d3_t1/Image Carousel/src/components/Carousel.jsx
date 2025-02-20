import React, { useState, useEffect } from "react";
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'

const images = [image1, image2, image3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    setIsPaused(true);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsPaused(true);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
  };

  return (
    <section className="body">
    <div className="carousel-container">
      <button
        className="btn btn-primary prev-btn"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        {"<"}
      </button>
      <div className="carousel-image-wrapper">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
      </div>
      <button
        className="btn btn-primary next-btn"
        onClick={goToNext}
        disabled={currentIndex === images.length - 1}
      >
        {">"}
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Carousel;

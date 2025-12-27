import React, { useState, useEffect } from "react";
import "../CSS/ImageCarousel.css";

export default function ImageCarousel({
  images = [],
  autoSlide = true,
  interval = 3000,
  height = "320px",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="carousel-container" style={{ height }}>
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="carousel-slide" key={index}>
            <img src={img} alt={`slide-${index}`} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="arrow left" onClick={prevSlide}>
            ❮
          </button>
          <button className="arrow right" onClick={nextSlide}>
            ❯
          </button>
        </>
      )}

      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
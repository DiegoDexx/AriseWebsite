import React, { useState, useEffect } from 'react';
import white1 from '../assets/img/white (1).png';
import white2 from '../assets/img/white (2).png';
import white3 from '../assets/img/white (3).png';
import white4 from '../assets/img/white (4).png';
import white5 from '../assets/img/white (5).png';
import beige1 from '../assets/img/beige (1).png';
import beige2 from '../assets/img/beige (2).png';
import beige3 from '../assets/img/beige (3).png';
import beige4 from '../assets/img/beige (4).png';
import beige5 from '../assets/img/beige (5).png';

const ProductSlider = ({ selectedColor }) => {
  const whiteImages = [white1, white2, white3, white4, white5];
  const beigeImages = [beige1, beige2, beige3, beige4, beige5];

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setImages(selectedColor === 'white' ? whiteImages : beigeImages);
    setCurrentIndex(0); // Reset carousel to the first image
  }, [selectedColor]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="product-slider">
      <div className="slider-container">
        <button onClick={prevImage} className="prev-button">←</button>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
        <button onClick={nextImage} className="next-button">→</button>
      </div>
      <div className="thumbnail-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail-image ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

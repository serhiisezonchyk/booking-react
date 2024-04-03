import React from 'react';

interface SliderProps {
  images: string[];
}
const Slider = ({ images }: SliderProps) => {
  const [imageIndex, setImageIndex] = React.useState<null | number>(null);
  const changeSlide = (direction: 'left' | 'right') => {
    if (imageIndex !== null) {
      if (direction === 'left') {
        setImageIndex(imageIndex === 0 ? images.length - 1 : imageIndex - 1);
      } else {
        setImageIndex(imageIndex === images.length - 1 ? 0 : imageIndex + 1);
      }
    }
  };
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="slider__full">
          <div className="slider__full-arrow">
            <img className="arrow__img" src="/arrow.png" alt="" onClick={() => changeSlide('left')} />
          </div>
          <div className="slider__full-img-container">
            <img
              className="img"
              src={images[imageIndex]}
              alt=""
              onClick={() => setImageIndex((prev) => (prev = null))}
            />
          </div>
          <div className="slider__full-arrow" onClick={() => changeSlide('right')}>
            <img className="arrow__img right" src="/arrow.png" alt="" />
          </div>
          <div className="slider__full-close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className="slider__big">
        <img className="slider-image big" src={images[0]} alt="Image" onClick={() => setImageIndex(0)} />
      </div>
      <div className="slider__small">
        {images.slice(1).map((image, index) => (
          <img
            className="slider-image small"
            src={image}
            alt="Image"
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

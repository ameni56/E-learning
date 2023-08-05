import React, { useState } from 'react';
import '../../../src/style.css';
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';


const Carousel = () => {
  const [activeImage, setActiveImage] = useState(1);

  const handleBulletClick = (index) => {
    setActiveImage(index);
  };

  return (
    <div className="carousel" >
      <div className="images-wrapper">
        <img src={image1} className={`image img-1 ${activeImage === 1 ? 'show' : ''}`} alt="" />
        <img src={image2} className={`image img-2 ${activeImage === 2 ? 'show' : ''}`} alt="" />
        <img src={image3} className={`image img-3 ${activeImage === 3 ? 'show' : ''}`} alt="" />
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div className="text-group">
            <h2>Apprendre avec TT Académie</h2>
            {/* <h2>Customize as you like</h2>
            <h2>Invite students to your class</h2> */}
          </div>
        </div>

        <div className="bullets">
          <span
            className={`${activeImage === 1 ? 'active' : ''}`}
            data-value="1"
            onClick={() => handleBulletClick(1)}
          ></span>
          <span
            className={`${activeImage === 2 ? 'active' : ''}`}
            data-value="2"
            onClick={() => handleBulletClick(2)}
          ></span>
          <span
            className={`${activeImage === 3 ? 'active' : ''}`}
            data-value="3"
            onClick={() => handleBulletClick(3)}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

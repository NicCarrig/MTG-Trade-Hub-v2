import React from 'react';
import { Link } from 'react-router-dom';

const HeroImage = () => {
return (

<div className="hero text-center" >
  <div className="mask" id="sky">
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="text-white">
          <Link to="/home">
            <h1 className='heroTitle'>Magic The Gathering</h1>
          </Link>
        <h2 className="heroTitle2 mb-3">Trading Hub</h2>
        <a className="heroTitle enterbtn btn btn-outline-light btn-lg" href="home" role="button">Enter</a>
      </div>
    </div>
  </div>
</div>
)
}

export default HeroImage;
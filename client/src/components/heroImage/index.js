import React from 'react';
import { Link } from 'react-router-dom';

const HeroImage = () => {
return (

<div class="hero text-center" >
  <div class="mask" id="sky">
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="text-white">
          <Link to="/home">
            <h1 className='heroTitle'>Magic The Gathering</h1>
          </Link>
        <h2 class="heroTitle2 mb-3">Trading Hub</h2>
        <a class="heroTitle enterbtn btn btn-outline-light btn-lg" href="home" role="button">Enter</a>
      </div>
    </div>
  </div>
</div>
)
}

export default HeroImage;
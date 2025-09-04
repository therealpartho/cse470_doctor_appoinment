import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>
          At ParthCare, we make healthcare simple and accessible by bringing everything 
          you need onto one platform. From booking doctor appointments with ease to accessing 
          specialists across various departments, we ensure a smooth and stress-free experience. 
          Our online consultation feature lets you connect with trusted doctors from the comfort 
          of your home, while secure medical records management keeps all your prescriptions and 
          reports safely in one place. With timely health reminders and quick access to emergency 
          support, ParthCare is here to make your healthcare journey more convenient, reliable, 
          and patient-friendly.
        </p>

      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero
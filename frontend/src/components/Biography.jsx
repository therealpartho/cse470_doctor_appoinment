import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about Img" />

      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          ParthCare stands as a beacon of excellence in healthcare, dedicated to providing comprehensive medical services with a human touch. 
          Founded with the vision of making quality healthcare accessible to all, we have grown from a small clinic to a trusted healthcare 
          institution that serves thousands of patients annually. Our commitment to excellence drives every aspect of our operations, 
          from patient care to medical innovation
        </p>
        <p>
          Our multidisciplinary team comprises highly qualified physicians, nurses, and healthcare professionals who bring decades of combined 
          experience across various medical specialties. We pride ourselves on maintaining the highest standards of medical practice while fostering 
          an environment of continuous learning and professional development. Each member of our team is carefully selected not only for their clinical 
          expertise but also for their compassion and dedication to patient welfare
        </p>
        <p>We believe that healthcare extends beyond treating illness – it encompasses prevention, education, and building lasting relationships with our 
          patients and their families. Our patient-centered approach ensures that every individual receives personalized attention and care in a comfortable,
          supportive environment. We take the time to listen to our patients' concerns and work collaboratively to develop treatment plans that align with their
           lifestyle and health goals.</p>
        <p>At ParthCare, we offer a comprehensive range of medical services including Pediatrics, Orthopedics, 
          Cardiology, Neurology, Oncology, Radiology, Physical Therapy, Dermatology, and ENT services. Our state-of-the-art 
          facilities are equipped with the latest medical technology and diagnostic equipment, ensuring accurate diagnoses and effective
           treatment plans tailored to each patient's unique needs</p>
        <p>Our commitment to the community goes beyond the walls of our facility. We regularly participate in health awareness programs, free medical 
          camps, and educational initiatives that promote wellness and preventive healthcare. We believe in giving back to the community that has placed 
          their trust in us, and we strive to make a positive impact on public health through our outreach efforts.</p>
        <p>Looking toward the future, ParthCare continues to evolve and expand our services to meet the changing healthcare needs of our community. We 
          remain committed to our core values of compassion, excellence, integrity, and innovation as we work toward our ultimate goal – ensuring that quality 
          healthcare is not just a privilege, but a right accessible to everyone who walks through our doors.</p>

      </div>

    </div>
  )
}

export default Biography
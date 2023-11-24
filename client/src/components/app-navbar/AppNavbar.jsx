import React from 'react'
import './AppNavbar.css'
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate()
  return (
    <div className='appnavbar-wrapper'>
      <h5 onClick={() => navigate('/home-page')}>
        HAYAT MART
      </h5>
      <h6>Ai Face Recognition gallery</h6>
      <section className='appbar-right-side-icons'>
        <p>
          <span style={{ backgroundColor: '#1f282f' }} className='appbar-home-icon' onClick={() => navigate('/home-page')}>
            <FaHome />
          </span>
        </p>
        <p>
          <span className='appbar-hamburger-icon'><GiHamburgerMenu /></span>
        </p>
      </section>
    </div>
  )
}

export default AppNavbar
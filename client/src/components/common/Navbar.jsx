import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'

const Navbar = () => {
  return (
    <div className='flex h-14 items-center justify-center border-b border-b-richblack-700  '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          {/* Image  */}
          <Link to={"/"}>
          <img src={logo} width={160} height={42} loading='lazy' alt="Navbar Logo" />
          </Link>

          {/* Nav Links */}
          <nav>
            <ul className='flex gap-6 text-richblack-25'>
              {
                NavbarLinks.map((link, idx) => (
                    <li key={idx}>
                        {
                            link.title === 'Catalog' ? (<div></div>)
                            :
                            (<NavLink className={({isActive}) => 
                                    isActive ? "text-yellow-25"  : " text-richblack-25 "
                            } to={link?.path}> 
                            <p> 
                                {link?.title}    
                                </p>       
                            </NavLink>)
                        }
                    </li>
                ))
              }
            </ul>
          </nav>

        </div>
      
    </div>
  )
}

export default Navbar

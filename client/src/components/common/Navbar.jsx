import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'


const Navbar = () => {
    const INSTRUCTOR = "Instructor"

    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)


    return (
        <div className='flex h-17  items-center justify-center border-b border-b-richblack-700  '>
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
                                            (<NavLink className={({ isActive }) =>
                                                isActive ? "text-yellow-25" : " text-richblack-25 "
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


                {/* Login Signup Dashboard  */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != INSTRUCTOR && (
                            <Link to={'/dashboard/cart'} className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {
                                                totalItems
                                            }
                                        </span>
                                    )
                                }

                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to={'/login'}>
                                <button className='border-richblack-700 cursor-pointer bg-richblack-800 px-3 py-2 text-richblack-100 rounded'>Log in</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={'/signup'}>
                                <button className='border-richblack-700 cursor-pointer bg-richblack-800 px-3 py-2 text-richblack-100 rounded'>Sign up</button>
                            </Link>
                        )
                    }

                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar

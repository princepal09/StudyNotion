import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { RiArrowDropDownLine } from "react-icons/ri";
import { categories } from '../../services/apis'


const Navbar = () => {
    const INSTRUCTOR = "Instructor"



    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)

    const [subLinks, setSubLinks] = useState([]);
 
    const fetchSubmit = async() =>{
        try{

            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:", result.data);
            setSubLinks(result.data.allCategories);


        }catch(err){
            console.log("Could not fetch the category list")
        }
    }

    useEffect( () =>{
        fetchSubmit()
    }, [])




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
                                        link.title === 'Catalog' ? (<div className='flex group relative items-center gap-1'>
                                            <p>{link.title}</p>
                                            <RiArrowDropDownLine size={18}/>

                                            <div className='invisible translate-x-[-50%] translate-y-[20%] absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100  lg:w-75 '>

                                                <div className="absolute left-[50%] translate-x-[80%] translate-y-[-20%]  rotate-45 rounded top-0 h-6 w-6 bg-richblack-5"></div>

                                                {
                                                    subLinks.length ? (
                                                        subLinks.map((sublink, idx) => {
                                                            return <Link to={''} key={idx}>
                                                                <p>{sublink.name}</p>
                                                            </Link>
                                                        })
                                                    ) : (<div></div>)
                                                }
 
                                            </div>


                                        </div>)
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

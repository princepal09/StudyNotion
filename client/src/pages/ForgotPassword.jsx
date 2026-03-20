import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authApi'
import { FaLongArrowAltLeft } from "react-icons/fa";


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className='flex mx-auto my-auto  justify-center '>            {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='flex   flex-col'>

                    <h1 className='text-richblack-5 font-semibold  text-3xl'>
                        {
                            !emailSent ? "Reset Your Password" : "Check your email"
                        }
                    </h1>

                    <p className='text-richblack-100 leading-6.5 w-[40%]'>
                        {
                            !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form className='mt-8 gap-8 flex flex-col' onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p className='mb-1 text-[12px] leading-5.5 text-richblack-5'>Email Address <sup className=' text-pink-200'>*</sup> </p>
                                    <input className='bg-richblack-800 w-[40%] rounded-md p-3 placeholder:text-[13px] placeholder:tracking-wider outline-none  text-richblack-5' type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email address' />
                                </label>
                            )
                        }

                        <button className='bg-yellow-50 w-[40%] p-3 rounded-md cursor-pointer font-medium self-start text-richblack-900 ' type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div className='mt-4 flex font-inter gap-2 items-center text-richblack-5 '>
                        <FaLongArrowAltLeft />
                        <Link to='/login'>
                            <p>Back to Login</p>
                        </Link>
                    </div>



                </div>
            )
        }
        </div>
    )
}

export default ForgotPassword

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authApi'
import { useLocation } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const location = useLocation();
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/'.at(-1))
        dispatch(resetPassword(password, confirmPassword, token))
    }

    return (
        <div>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>

                ) :

                    (

                        <div>

                            <h1>Choose New Password</h1>
                            <p>Almost Done, enter your new password and you are all set.</p>

                            <form onSubmit={handleOnSubmit}>

                                <label className='relative w-[50%]' >
                                    <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
                                        New Password <sup className="text-pink-200">*</sup>
                                    </p>

                                    <input type={showPassword ? "text" : "password"} required value={password} onChange={handleOnChange}
                                        name='password' placeholder='Enter new Password' style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }} className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-9.5 z-10 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )}
                                    </span>
                                </label>

                                <label className='relative w-[50%]' >
                                    <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
                                        Confirm Password <sup className="text-pink-200">*</sup>
                                    </p>

                                    <input type={showPassword ? "text" : "password"} required value={confirmPassword} onChange={handleOnChange}
                                        name='confirmPassword' placeholder='Enter Confirm Password' style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }} className="w-full  rounded-lg bg-richblack-800 p-3 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-9.5 z-10 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )}
                                    </span>
                                </label>


                                <button type='submit'>
                                    Reset password
                                </button>

                            </form>
                        </div>


                    )
            }

        </div>
    )
}

export default UpdatePassword

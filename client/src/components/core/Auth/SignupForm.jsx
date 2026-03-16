import React, { useState } from 'react'
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSignUpData } from '../../../redux/slices/authSlice'
import toast from 'react-hot-toast'
const SignupForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))

  }
  // Handle Form Submission
  const handleOnSubmit = () => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      console.log("p")
      return;
    }

    const signupData = {
      ...formData,
      accountType
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignUpData(signupData))

    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)


  }


  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR
    }
  ]

  return (
    <div>
      {/* Tab  */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* Form  */}
      <form onClick={handleOnSubmit} className='flex flex-col w-full gap-y-4 ' >

        {/* Name  */}
        <div className='flex gap-x-4'>

          {/* First Name  */}
          <label>
            <p className='mb-1 text-[0.875rem] leading-5.5 text-richblack-5'>
              First Name <sup className='text-pink-200'>*</sup>
            </p>

            <input type="text" required value={firstName} onChange={handleOnChange}
              name='firstName' placeholder='Enter First Name' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}

              className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5'
            />

          </label>

          {/* Last Name  */}
          <label >
            <p className='mb-1 text-[0.875rem] leading-5.5 text-richblack-5'>
              Last Name <sup className='text-pink-200'>*</sup>
            </p>

            <input type="text" required value={lastName} onChange={handleOnChange}
              name='lastName' placeholder='Enter First Name' style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}

              className='w-full rounded-lg bg-richblack-800 p-3 text-richblack-5'
            />

          </label>

        </div>

        {/* Email Address  */}
        <label className='w-ful'>

          <p className='mb-1 text-[0.875rem] leading-5.5 text-richblack-5'>
            Email Address <sup className='text-pink-200'>*</sup>
          </p>

          <input type="email" required value={email} onChange={handleOnChange}
            name='email' placeholder='Enter email address' style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5" />
        </label>

        {/* password  */}
        <div className='w-full flex gap-4'>

          {/* Create password  */}
          <label className='relative w-[50%]' >
            <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>

            <input type={showPassword ? "text" : "password"} required value={password} onChange={handleOnChange}
              name='password' placeholder='Enter Password' style={{
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

          {/* Confirm password  */}
          <label className="relative w-[50%]">
            <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"} onChange={handleOnChange}
              required name='confirmPassword' value={confirmPassword}

              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9.5 z-10 cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>

          </label>
        </div>

        {/* Create Account Button  */}
        <button type='submit'
          className='mt-6 rounded-lg bg-yellow-50 
           py-2 px-3 font-medium text-richblack-900
            cursor-pointer '
        >
          Create Account
        </button>



      </form>

    </div>
  )
}

export default SignupForm

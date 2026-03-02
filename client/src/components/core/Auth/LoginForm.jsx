import React from 'react'
import {ACCOUNT_TYPE} from "../../../utils/constants"
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom'

const LoginForm = () => {
  
    const tabData = [
      {
        id : 1,
        tabName : "Student",
        type : ACCOUNT_TYPE.STUDENT
      },
      {
        id : 2,
        tabName : "Instructor",
        type : ACCOUNT_TYPE.INSTRUCTOR
      }
    ]

  return (
    <div>
      {/* Tab  */}
      <Tab tabData = {tabData} field/>

      <form className='flex flex-col w-full gap-y-4 ' >

        {/* Email Address  */}
        <label className='w-full'  >
           <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        
         <input
          required
          type="text"
          name="email"
          placeholder="Enter email address"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
        />
        </label>

        {/* Password  */}
        <label >
           <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
          <input
          required
          name="password"
          placeholder="Enter Password"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-lg bg-richblack-800 p-3 pr-12 text-richblack-5"
        />
         <Link to="/forgot-password">
                  <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                    Forgot Password
                  </p>
                </Link>
        </label>
         
         {/* Sign In Button  */}
        <button type='submit' className='mt-6 rounded-lg bg-yellow-50 py-2 px-3 font-medium text-richblack-900 cursor-pointer ' >
           Sign In
        </button>
      </form>
       
    </div>
  )
}

export default LoginForm

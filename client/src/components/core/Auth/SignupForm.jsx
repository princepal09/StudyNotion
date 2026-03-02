import React from 'react'
import {ACCOUNT_TYPE} from "../../../utils/constants"
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
const SignupForm = () => {

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

      {/* Form  */}
      <form className='flex flex-col w-full gap-y-4 ' >

        {/* Name  */}
        <div className='flex gap-x-4'>

          {/* First Name  */}
          <label> 
            <p className='mb-1 text-[0.875rem] leading-5.5 text-richblack-5'>
              First Name <sup className='text-pink-200'>*</sup>
            </p>

            <input type="text" required 
            name='firstname' placeholder='Enter First Name' style={{
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

               <input type="text" required 
            name='firstname' placeholder='Enter First Name' style={{
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

              <input type="email" required 
            name='firstname' placeholder='Enter email address' style={{
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

             <input type="email" required 
            name='firstname' placeholder='Enter Password' style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}   className="w-full rounded-lg bg-richblack-800 p-3 text-richblack-5"
            />
          </label>
              
              {/* Confirm password  */}
             <label className="relative w-[50%]">
                      <p className="mb-1 text-[0.875rem] leading-5.5 text-richblack-5">
                        Confirm Password <sup className="text-pink-200">*</sup>
                      </p>
                      <input
                        required
                       
                        placeholder="Confirm Password"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-lg bg-richblack-800 p-3 pr-10 text-richblack-5"
                      />
                
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

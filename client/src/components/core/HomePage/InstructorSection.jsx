import React from 'react'
import HighlightText from './HighlightText'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";
import instructor from "../../../assets/Images/Instructor.png"


const InstructorSection = () => {
  return (
    <div className='mt-20'>
      <div className='flex flex-row gap-20 items-center'>

        <div className='w-[50%]'>
            <img src={instructor} className='shadow-[-20px_-20px_0px_0px_#FFFFFF]' alt="Instructor" loading='lazy'  />
        </div>

        <div className='w-[50%] flex flex-col gap-5 items-start ' >
            <h2 className='font-semibold text-4xl '>
                Become an <br />
                <HighlightText text={"Instructor"}/>
            </h2>

            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

            <Button active={true} linkto={"/signup"}> 
            <div className='flex items-center justify-center gap-2 font-normal'> 
                <p className=''>Start Teaching Today</p>
                <FaArrowRight size={10}/>
                </div>

            </Button>


            
        </div>

      </div>
    </div>
  )
}

export default InstructorSection

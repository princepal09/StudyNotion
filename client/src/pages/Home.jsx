import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';

const Home = () => {
    return (
        <div>
            {/* Section 1 */}

            <div className="reltaive mx-auto flex flex-col w-11/12 items-center text-white justify-between ">

                <Link to={'/signup'} >
                    <div className=' group mt-16 p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95  w-fit  shadow-md'>
                        <div className='flex items-center gap-2 rounded-full px-10 py-2 transition-all group-hover:bg-richblack-900 duration-200' >
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='mt-7 text-center text-4xl w-full font-semibold'>
                    Empower Your Future with <HighlightText text={"Coding Skills"} />
                </div>

                <div className='w-[80%] mt-4  text-center text-lg font-bold text-richblack-300 ' >
                    With our online coding courses, you can learnt at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7  mt-8 '>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"}>
                        Book a Demo
                    </CTAButton>

                </div>

                <div className=' mx-3 my-12  shadow-blue-200'>
                    <video muted loop autoPlay width={500}  >
                        <source src={banner} type='video/mp4' />
                    </video>
                </div>

                {/* Code Section 1 */}

                <div>
                    <CodeBlocks
                        position={"lg : flex-col "}
                        heading={<div className='text-4xl font-semibold' > Unlock Your <HighlightText text={"coding potential"} /> 
                            with our online courses
                        </div>}

                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                        ctabtn1={
                            {
                                btnText : "try it yourself",
                                linkto : "/signup",
                                active : true,

                            }
                        }
                        ctabtn2={
                            {
                                btnText : "learn more",
                                linkto : "/signup",
                                active : false,

                            }
                        }

                        Codeblock={`<Do`}

                    />
                </div>

            </div>

            {/* Section 2 */}

            {/* Section 3 */}

            {/* Footer  */}
        </div>
    )
}

export default Home

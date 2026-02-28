import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import image from '../assets/Images/bghome.svg'
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';

const Home = () => {
    return (
        <div>
            {/*Section1  */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between'>

                <Link to={"/signup"}>
                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-1.25
                transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>

                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                <div className="shadow-[25px_25px_0px_0px_#FFFFFF] mx-3 my-12">
                    <video
                        muted
                        loop
                        autoPlay
                        className="w-full h-auto"
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>


                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock your
                                <HighlightText text={"coding potential"} /> {" "}
                                with our online courses
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={"coding in seconds"} /> {" "}
                                
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "continue lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }

                        codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n`}
                        codeColor={"text-yellow-25"}
                    />
                </div>

                <ExploreMore/>


            </div>

            {/*Section 2  */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div style={{backgroundImage : `url(${image})`}} className='homepage_bg h-83.25'>

                    <div className='w-11/12 flex items-center flex-col justify-center gap-5 mx-auto max-w-maxContent'>
                     <div className='h-32.5 '></div>
                    <div className='flex flex-row gap-7 text-white '>
                        <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-4'>
                            Explore full catalog 
                            <FaArrowRight/>
                        </div>

                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                        <div className='flex items-center gap-4'>
                            Learn more 
                            <FaArrowRight/>
                        </div>

                        </CTAButton>

                    </div>
 
                    </div>

                </div> 

                <div className=' w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto'>

                <div className='flex flex-row gap-14 tracking-wider my-10'>

                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand "}/>
                    </div>

                    <div className='flex flex-col gap-10 items-start w-[40%] '>
                    <p className='text-[16px] font-semibold '>
                        The Modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than thier professionals Skills.
                    </p>

                    <CTAButton active={true} linkto={"/signup"}>
                    <div>Learn More</div>
                    </CTAButton>


                      
                    

                </div>

                </div>
                
                <TimeLineSection/>

                <LearningLanguageSection/>
                
                

                </div>

              

            </div>


            {/*Section 3 */}

            <div className='w-11/12 mx-auto max-w-maxContent flex-col gap-8 text-white bg-richblack-900 justify-between items-center'>

            <InstructorSection/> 
            
            <h2 className='text-center font-semibold text-4xl mt-10'>Review from other Learners</h2>
            
            {/* Review Slider */}
             


            </div>



            {/*Footer */}
            <Footer/>



        </div>
    )
}

export default Home

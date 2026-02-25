import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
const timeline = [

    {
        logo: Logo1,
        heading: "Leadership",
        Description: "Fully Commited to the success company"
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        Description: "Fully Commited to the success company"
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        Description: "Fully Commited to the success company"
    },
    {
        logo: Logo4,
        heading: "Solve the problems",
        Description: "Fully Commited to the success company"
    },

]

const TimeLineSection = () => {

    return (
        <div>
            <div className='flex flex-row gap-15 items-center'>
                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((elem, idx) => {
                            return (
                                <div className='flex flex-row gap-6' key={idx}>

                                    <div className='w-12.5 h-12.5 items-center  bg-white '>
                                        <img src={elem.logo} />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]' >{elem.heading}</h2>
                                        <p className='text-base'>{elem.Description}</p>
                                    </div>

                                </div>
                            )

                        })
                    }
                </div>

                <div className='relative py-4 shadow-blue-200'>
                    <img src={timelineImage} alt="timelineImage" className='shadow-white object-cover h-fit ' loading='lazy' />

                    <div className='absolute left-[50%] translate-x-[-50%] translate-y-[-40%] bg-caribbeangreen-700 gap-6 flex flex-row text-white uppercase px-4 py-6'>
                        <div className='flex  gap-3 items-center' >
                            <h1 className='text-3xl font-bold'>10</h1>
                            <h1 className='text-caribbeangreen-300 text-sm'>Years of Experience</h1>
                        </div>

                        <div className="bg-caribbeangreen-300 w-1"></div>

                        <div className='flex flex-row gap-3 items-center  border-caribbeangreen-300' >
                            <h1 className='text-3xl font-bold'>250</h1>
                            <h1 className='text-caribbeangreen-300 text-sm'>Type of Courses</h1>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default TimeLineSection

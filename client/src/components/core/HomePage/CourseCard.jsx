import React from 'react'
import { IoMdPeople } from "react-icons/io";
import { MdDeviceHub } from "react-icons/md";

const CourseCard = ({ elem, setCurrCard, currCard }) => {

    return (
        <div className={` ${currCard !== elem.heading ? "bg-richblack-800 " : "bg-pure-greys-5 shadow-[15px_15px_0px_0px_#FACC15]"}`} >
            <div className='px-6 py-5'>

                <div className='flex text-[16px]  flex-col gap-3'>
                    <h3 className={` text-[20px] font-black ${currCard !== elem.heading ? "text-richblack-25" : "text-richblack-800"}`}>{elem.heading}</h3>
                    <p className={`${currCard !== elem.heading ? "text-richblack-400" : "text-richblack-500"}`}>{elem.description}</p>
                </div>

<div className="-mx-6 border-t border-dotted border-richblack-400 my-6"></div>                <div className={`${currCard !== elem.heading ? "text-richblack-300" : "text-blue-500 "} flex flex-row pt-9 items-center justify-between `}>
                    <div className={`flex gap-2 items-center`}>
                        <IoMdPeople />
                        <p>{elem.level}</p>
                    </div>
                    <div className={`flex gap-2 items-center`}>
                        <MdDeviceHub />
                        <p>{elem.lessionNumber} Lessons</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CourseCard

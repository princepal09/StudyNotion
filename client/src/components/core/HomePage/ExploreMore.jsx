/* eslint-disable no-unused-vars */
import { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from "./HighlightText"
import CourseCard from "./CourseCard"

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"]

const ExploreMore = () => {

  const [currTab, setCurrTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses)
  const [currCard, setCurrCard] = useState(HomePageExplore[0].courses[0].heading)

  const setMyCards = (value) => {
    setCurrTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrCard(result[0].courses[0].heading)
  }



  return (
    <div className="w-11/12 relative mb-10 lg:mb-0  max-w-maxContent mx-auto">

      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power Of Code"} />
      </div>

      <p className="text-center text-richblzack-300 text-sm  text-[16px] mb-5 border-richblack-100 mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="flex justify-center w-full  items-center gap-2 py-1 px-2 lg:w-[60%] mx-auto bg-richblack-800 rounded-full items-center mt-5">
        {tabsName.map((elem, idx) => {
          return (
            <div className={`lg:text-[16px] text-[14px] flex gap-2  ${currTab === elem ? "bg-richblack-900 text-richblack-5 font-medium " :
              "text-richblack-200 "} rounded-full   transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-2 md:px-6 py-2`}
              key={idx} onClick={() => setMyCards(elem)} >
              {elem}
            </div>
          )
        })}
      </div>

      <div className="lg:h-37.5 ">

        {/* Group of course Card */}

        <div className="mt-10 lg:absolute  flex-col lg:flex-row flex gap-11 lg:gap-6 justify-start">
          {
            courses.map((elem, idx) => {
              return (
                <CourseCard key={idx} elem={elem} currCard={currCard} setCurrCard={setCurrCard} />
              )
            })
          }
        </div>

      </div>

    </div>
  )
}

export default ExploreMore

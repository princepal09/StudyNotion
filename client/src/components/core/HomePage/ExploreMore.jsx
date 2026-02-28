import { useState } from "react"
import {HomePageExplore} from "../../../data/homepage-explore"

const tabsName = ["Free", "New to coding", "Most Popular", "Skills Paths", "Career Paths" ]

const ExploreMore = () => {

    const [currTab, setCurrTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currCard, setCurrCard] = useState(HomePageExplore[0].courses[0].heading)

   const setMyCards = (value) =>{
    setCurrTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrCard(result[0].courses[0].heading)
   }

    

  return (
    <div>
      
    </div>
  )
}

export default ExploreMore

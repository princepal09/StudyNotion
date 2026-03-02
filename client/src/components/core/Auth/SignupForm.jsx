import React from 'react'
import {ACCOUNT_TYPE} from "../../../utils/constants"
import Tab from '../../common/Tab'

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

    </div>
  )
}

export default SignupForm

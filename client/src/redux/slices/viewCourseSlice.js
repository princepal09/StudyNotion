import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: localStorage.getItem("completedLectures") ? JSON.parse(localStorage.getItem("completedLectures")) : [],
  totalNoOfLectures: 0,
}

// console.log(initialState.completedLectures)


const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      // console.log("payload:", action.payload);
      // console.log("before:", state.completedLectures);

      state.completedLectures = [
        ...state.completedLectures,
        action.payload,
      ];

      // console.log("after:", state.completedLectures);
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailApi";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  console.log("ViewCourse rendered");

  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setCourseSpecificDetails = async () => {
    const courseData = await getFullDetailsOfCourse(courseId, token);
    dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
    dispatch(setEntireCourseData(courseData.courseDetails));
    dispatch(setCompletedLectures(courseData.completedVideos));

    let lectures = 0;
    courseData?.courseDetails?.courseContent.forEach((sec) => {
      lectures += sec.subSection.length;
    });

    dispatch(setTotalNoOfLectures(lectures));
  };

  useEffect(() => {
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div>
          <Outlet />
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default ViewCourse;

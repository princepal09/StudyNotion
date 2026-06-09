import React, { useEffect, useState } from "react";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailApi";
import toast from "react-hot-toast";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const result = await fetchInstructorCourses(token);
      setCourses(result);
    } catch (err) {
      console.log(err.message);    } 
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div >
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>

        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        />
      </div>
          <VscAdd />

      {courses && <CoursesTable courses={courses}  setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;

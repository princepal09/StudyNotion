import React, { useEffect, useState } from "react";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailApi";
import toast from "react-hot-toast";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className="text-white">
      <div>
        <h1>My Courses</h1>

        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
          // TODO ADD ICON
        />
      </div>

      {courses && <CoursesTable courses={courses}  setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;

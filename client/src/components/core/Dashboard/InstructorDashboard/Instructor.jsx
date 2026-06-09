import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchInstructorCourses,
  getInstructorData,
} from "../../../../services/operations/courseDetailApi";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);

  const getCourseDataWithStats = async () => {
    setLoading(true);

    const instructorApiData = await getInstructorData(token);
    const result = await fetchInstructorCourses(token);

    console.log("instructorApiData", instructorApiData);

    if (instructorApiData.length) {
      setInstructorData(instructorApiData);
    }

    if (result) {
      setCoursesData(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0,
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0,
  );

  return (
    <div className="text-white">
      <div>
        <h1>Hi{user?.firstName}</h1>
        <p>Let's something new </p>
      </div>

      {loading ? (
        // Loader
        <div className="spinner"></div>
      ) : coursesData.length > 0 ? (
        <div>
          <div>
            <div>
              <InstructorChart courses={instructorData} />

              <div>
                <p>Statistics</p>

                <div>
                  <p>Total Courses</p>
                  <p>{coursesData?.length}</p>
                </div>

                <div>
                  <p>Total Students</p>
                  <p>{totalStudents}</p>
                </div>

                <div>
                  <p>Total Income</p>
                  <p>{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Render 3 courses  */}
            <div>
              <p>Your Courses</p>
              <Link to={"/dashboard/my-courses"}>
                <p>View All</p>
              </Link>
            </div>

            <div>
              {coursesData?.slice(0, 3).map((course) => (
                <div key={course?._id}>
                  <img loading="lazy" src={course?.thumbnail} />

                  <div>
                    <p>{course?.courseName}</p>

                    <div>
                      <p>{course?.studentsEnrolled?.length}Students</p>
                      <p>|</p>
                      <p>Rs {course?.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You Have not created any courses yet </p>
          <Link to={"/dashboard/addCourse"}>
            <p>Create a course</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;

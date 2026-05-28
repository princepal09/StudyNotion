import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  console.log(enrolledCourses)

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (err) {
      console.log("UNABLE TO FETCH ENROLL COURSES", err.message);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white">
      <h1>Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled in any course yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progress</p>
          </div>

          {/* Cards starts here  */}

          {enrolledCourses.map((course, idx) => {
            return (
              <div key={idx}>
                <div>
                  <img src={course?.thumbnail} loading="lazy" />
                  <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.courseDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;

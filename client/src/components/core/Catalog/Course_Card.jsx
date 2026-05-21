import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Course_Card = ({ course, Height }) => {
    console.log(course)

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
          const count = getAvgRating(course?.ratingAndReviews)
        //   setAvgReviewCount(count)
    }, [count])
  return (
    <div>
      <Link to = {`/courses/${course?._id}`} >
        <div>
          <div>
            <img className={`${Height} w-full rounded-xl object-cover`} src={course?.thumbnail} loading="lazy" alt="course thumbnail "/> 
          </div>

          <div>
            <p>{course?.courseName}</p>
            <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

            <div>
              <span>{avgReviewCount || 0}</span>
              {/* <RatingStars /> */}
              <span></span>
            </div>
            <p></p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;

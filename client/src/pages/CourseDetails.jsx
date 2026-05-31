import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeatureApi";
import { fetchCourseDetails } from "../services/operations/courseDetailApi";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formattedDate } from "../utils/dateFormatter";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [active, isActive] = useState(Array(0)); // We can write this part like this
  // const[active, isActive] = useState([]); both above  are same

  const getCourseDetails = async () => {
    try {
      const res = await fetchCourseDetails(courseId);
      console.log(res);
      setCourseData(res);
    } catch (err) {
      console.log(err);
      console.log("Could not fetch course details");
    }
  };

  // console.log(courseData);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id),
    );
  };

  useEffect(() => {
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.courseDetails.ratingAndReview);
    setAvgReviewCount(count);
  }, [courseData]);

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    } else {
      setConfirmationModal({
        text1: "you are not logged in ",
        text2: "Please login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  useEffect(() => {
    let lectures = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.lenggth || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.courseDetails;

  return (
    <div className="flex flex-col items-center text-white">
      <div className="relative flex flex-col justify-start p-8">
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        <div>
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
          <span>{`(${ratingAndReviews?.length} reviews)`}</span>
          <span>{`(${studentsEnrolled?.length} enrolled)`}</span>
        </div>

        <div>
          <p>Created By {`(${instructor?.firstName})`}</p>
        </div>

        <div className="flex gap-x-3">
          <p>Created at {formattedDate(createdAt)}</p>
          <p>English</p>
        </div>

        <div>
          <CourseDetailsCard
            course={courseData?.courseDetails}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>

      <div>
        <p>What you will learn</p>
        <div>{whatYouWillLearn}</div>
      </div>

      <div>
        <div>
          <p>Course Content: </p>
        </div>

        <div className="flex gap-x-3 justify-between ">
          <div>
            <span>{courseContent?.length} section(s)</span>
            <span>{totalNoOfLectures} lectures</span>
            <span>{courseData?.totalDuration} total length</span>
          </div>

          <div>
            <button onClick={() => setIsActive([])}>
              Collapse all Sections
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;

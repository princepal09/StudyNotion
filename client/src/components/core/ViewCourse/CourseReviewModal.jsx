import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from 'react-stars'
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailApi";
import { data } from "react-router-dom";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExpirence", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async() => {
    await createRating({
        courseId : courseEntireData._id,
        rating : data.couresRating,
        review : data.courseExperience
    }, token);

    setReviewModal(false);

  };

  return (
    <div>
      <div>
        {/* Modal Header  */}
        <div>
          <p>Add review</p>
          <button onClick={() => setReviewModal(false)}>Close</button>
        </div>

        {/* Modal Body  */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="User Image"
              className="aspect-square w-12.5 rounded-full object-cover"
              loading="lazy"
            />

            <div>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
              <p>Posting Publicly</p>
            </div>
          </div>

          <form
            className="mt-6 flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ReactStars
              onChange={ratingChanged}
              count={5}
              size={24}
              activeColor="#ffd700"
            />

            <div>
              <label>Add your experience</label>
              <textarea
                id="courseExperience"
                placeholder="Add your experience here"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span>Please add your experience</span>
              )}
            </div>

{/* Cancel and save button  */}
            <div>
                <button onClick={() => setReviewModal(false)} >
                    Cancel
                </button>
                <IconBtn text={'save'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;

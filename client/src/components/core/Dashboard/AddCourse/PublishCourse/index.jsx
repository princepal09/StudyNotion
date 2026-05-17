import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../redux/slices/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/courseDetailApi";
import { COURSE_STATUS } from "../../../../../utils/constants";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourses = () =>{

    dispatch(resetCourseState());
    // navigate("/dashboad/my-courses")
  }

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form
      // no need to make api call
      goToCourses();
      return;
    }

    // if form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);

    const courseStatus = getValues("public") ?  COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if(result){
      goToCourses();
    }

    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border bg-richblack-800 p-6 border-richblack-700">
      <p>Publish Course</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="rounded h-4 w-4"
            />
            <span className="ml-3 ">Make this cours as Public</span>
          </label>
        </div>

        <div className="flex gap-x-3 justify-end">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md"
            disabled={loading}
          >
            Back
          </button>

          <IconBtn disabled={loading} type='submit' text="Save changes" />
        </div>
      </form> 
    </div>
  );
};

export default PublishCourse;

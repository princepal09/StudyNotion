import React, { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailApi";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("coursCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    // getCategories();
  }, []);

  const onSubmit = async(data) =>{

  }

  return (
    <form className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8" onSubmit={handleSubmit(onSubmit)} >

        <div>
            <label >Course Title <sup>*</sup></label>
            <input type="text" id="couseTitle" placeholder="Enter Course Title"
            {...register("courseTitle", {required : true})}
            className="w-full"
            />
            {
                errors.cousrseTitle && (
                    <span>Course title is required</span>
                )
            }
        </div>
        

    </form>
  )
};

export default CourseInformationForm;

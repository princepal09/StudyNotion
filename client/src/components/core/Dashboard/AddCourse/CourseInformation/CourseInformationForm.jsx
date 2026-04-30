import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

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
    getCategories();
  }, []);

  const onSubmit = async (data) => {};

  return (
    <form
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label>
          Course Title <sup>*</sup>
        </label>
        <input
          id="courseTitle"
          type="text"
          id="couseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full"
        />
        {errors.cousrseTitle && <span>Course title is required</span>}
      </div>

      <div className="relative">
        <label>
          Course Price <sup>*</sup>
        </label>
        <input
          id="coursePrice"
          className="w-full"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className=" w-full"
        />
        <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
        {errors.courseShortDesc && <span>Course Price is required</span>}
      </div>

      <div>
        <label>
          Course Short Description <sup>*</sup>
        </label>
        <textarea
          className="w-full"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-35 w-full"
        />

        {errors.courseShortDesc && <span>Course Title is required</span>}
      </div>

      <div>
        <label>Course Category<sup>*</sup></label>
        <select id='courseCategory' 
        defaultValue={''}
        {...register("courseCategory", {required : true})}
        >
            <option value="" disabled>Choose a Category</option>
            {
                !loading && courseCategories.map((category, idx) => (
                    <option key={idx} value={category?.id}>
                        {category?.name}
                    </option>
                ) )
            }
      
        </select>

      </div>
    </form>
  );
};

export default CourseInformationForm;

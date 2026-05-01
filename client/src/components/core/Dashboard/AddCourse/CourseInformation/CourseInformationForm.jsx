import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from "./RequirementField";
import { setStep } from "../../../../../redux/slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";

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
  // console.log(courseCategories)

  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    // console.log(categories)
    if (categories.length > 0) {
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

  const ifFormUpdated = () =>{
     const currentValues  = getValues();
     if(currentValues.courseTitle !== course.courseName 
      || currentValues.courseShortDesc !== course.courseDescription 
      ||currentValues.coursePrice !== course.price 
      ||currentValues.courseTitle !== course.courseName 
      // ||currentValues.courseTags.toString() !== course.tag.toString()
      ||currentValues.courseBenefits !== course.whatYouWillLearn 
      ||currentValues.courseCategory._id !== course.category._id
      // ||currentValues.courseImage !== course.thumbnail  
      ||currentValues.courseRequirements.toString() !== course.instructions.toString()  
     ){
      return true;
     }else{
      return false;
     }
  } 

  // handle next button click 
  const onSubmit = async (data) => {
    if(editCourse){
      const currentValue = getValues();
      const formData = new FormData();
      formData.append("courseId", course._id)
      if(currentValues.courseTitle !== course.courseName){
        formData.append("courseName", data.courseTitle)
      }
    }
  };

  return (
    <form
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="courseTitle">
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
        <label htmlFor="coursePrice">
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
        <label htmlFor="courseDesc">
          Course Short Description <sup>*</sup>
        </label>
        <textarea
          id="courseDesc"
          className="w-full"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-35 w-full"
        />

        {errors.courseShortDesc && <span>Course Title is required</span>}
      </div>

      <div>
        <label htmlFor="courseCategory">
          Course Category<sup>*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue={""}
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, idx) => (
              <option key={idx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span>Course Category is required</span>}
      </div>

      {/* Create  a custom component for handling tags input  */}
      {/* <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        getValue={getValue}
        setValues={setValues}
      /> */}

      {/* Create a component for uploading and showing preview of media */}
      {/* <Upload name = label = register =  errors = setValue =   */}

      {/* Benefits of the course  */}
      <div>
        <label>
          Benefits of the course <sup>*</sup>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="min-h-32.5 w-full"
        ></textarea>
        {errors.courseBenefits && (
          <span>Benefits of the course are required**</span>
        )}
      </div>


      <RequirementField
      name = "courseRequirements"
      label = "Requirements/Instructions"
      register = {register}
      errors = {errors}
      setValue = {setValue}
      getValues = {getValues}
      />

      <div>
        {editCourse &&  (
          <button onClick={() => dispatch(setStep(2))}

          >
            Conitune without saving
          </button>

        )}
        <IconBtn text={!editCourse ? "Next" : "Save Changes"}
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
